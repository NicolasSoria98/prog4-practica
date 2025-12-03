const repository = require('../repositories/playerRepository')

function getCategory(elo) {
    if (elo < 1400) return 'Principiante'
    if (elo >= 1400 && elo < 1800) return 'Intermedio'
    if (elo >= 1800 && elo < 2200) return 'Avanzado'
    return 'Maestro'
}

async function createPlayer(data) {
    const allPlayers = await repository.getAllPlayers()
    const emailExists = allPlayers.some(p => p.email === data.email)
    if (emailExists) {
        throw new Error('Email duplicado')
    }

    const player = {
        name: data.name,
        email: data.email,
        elo: 1200,
        wins: 0,
        losses: 0,
        draws: 0,
        isActive: true,
        registeredAt: new Date().toISOString()
    }

    player.id = allPlayers.length > 0
        ? Math.max(...allPlayers.map(p => p.id)) + 1
        : 1

    return await repository.createPlayer(player)
}

async function getPlayers(filters = {}) {
    let players = await repository.getAllPlayers()

    if (filters.category) {
        players = players.filter(p => {
            const playerCategory = getCategory(p.elo)
            return playerCategory === filters.category
        })
    }

    if (filters.minElo) {
        players = players.filter(p => p.elo >= parseInt(filters.minElo))
    }

    if (filters.maxElo) {
        players = players.filter(p => p.elo <= parseInt(filters.maxElo))
    }

    if (filters.isActive !== undefined) {
        const active = filters.isActive === 'true'
        players = players.filter(p => p.isActive === active)
    }

    return players
}

async function getPlayerById(id) {
    const player = await repository.getPlayerById(id)
    if (!player) {
        throw new Error('Jugador no encontrado')
    }
    return player
}

async function getPlayerStats(id) {
    const player = await getPlayerById(id)
    const totalMatches = player.wins + player.losses + player.draws
    const winRate = totalMatches > 0
        ? ((player.wins / totalMatches) * 100).toFixed(2)
        : 0
    const category = getCategory(player.elo)

    return {
        id: player.id,
        name: player.name,
        email: player.email,
        elo: player.elo,
        category: category,
        totalMatches: totalMatches,
        wins: player.wins,
        losses: player.losses,
        draws: player.draws,
        winRate: winRate + '%',
        isActive: player.isActive,
        registeredAt: player.registeredAt
    }
}

async function updatePlayer(id, updates) {
    const exists = await repository.getPlayerById(id)
    if (!exists) {
        throw new Error('Jugador no encontrado')
    }

    if (updates.email) {
        const allPlayers = await repository.getAllPlayers()
        const emailTaken = allPlayers.some(p => 
            p.email === updates.email && p.id !== parseInt(id)
        )
        if (emailTaken) {
            throw new Error('Email duplicado')
        }
    }

    return await repository.updatePlayer(id, updates)
}

async function updatePlayerStatus(id, isActive) {
    const exists = await repository.getPlayerById(id)
    if (!exists) {
        throw new Error('Jugador no encontrado')
    }
    return await repository.updatePlayer(id, { isActive })
}

async function deletePlayer(id) {
    const player = await repository.getPlayerById(id)
    if (!player) {
        throw new Error('Jugador no encontrado')
    }

    const hasMatches = player.wins > 0 || player.losses > 0 || player.draws > 0
    if (hasMatches) {
        throw new Error('No se puede eliminar un jugador con partidas registradas')
    }

    return await repository.deletePlayer(id)
}

module.exports = {
    createPlayer,
    getPlayers,
    getPlayerById,
    getPlayerStats,
    updatePlayer,
    updatePlayerStatus,
    deletePlayer
}