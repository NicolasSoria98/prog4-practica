const repository = require('../repositories/tournamentRepository')
const playerRepository = require('../repositories/playerRepository')

async function createTournament(data) {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    
    if (end <= start) {
        throw new Error('La fecha de fin debe ser posterior a la fecha de inicio')
    }
    
    if (data.maxPlayers < 4 || data.maxPlayers > 32) {
        throw new Error('El máximo de jugadores debe estar entre 4 y 32')
    }
    
    const tournament = {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        minElo: data.minElo,
        maxElo: data.maxElo,
        maxPlayers: data.maxPlayers,
        status: 'upcoming',
        registeredPlayers: [],
        prizePot: data.prizePot
    }
    
    const allTournaments = await repository.getAllTournaments()
    tournament.id = allTournaments.length > 0
        ? Math.max(...allTournaments.map(t => t.id)) + 1
        : 1
    
    return await repository.createTournament(tournament)
}

async function getTournaments(filters = {}) {
    let tournaments = await repository.getAllTournaments()
    
    if (filters.status) {
        tournaments = tournaments.filter(t => t.status === filters.status)
    }
    
    if (filters.minPrizePot) {
        tournaments = tournaments.filter(t => t.prizePot >= parseInt(filters.minPrizePot))
    }
    
    if (filters.availableSlots === 'true') {
        tournaments = tournaments.filter(t => 
            t.registeredPlayers.length < t.maxPlayers
        )
    }
    
    return tournaments
}

async function getTournamentById(id) {
    const tournament = await repository.getTournamentById(id)
    
    if (!tournament) {
        throw new Error('Torneo no encontrado')
    }
    
    return tournament
}

async function updateTournamentStatus(id, newStatus) {
    const exists = await repository.getTournamentById(id)
    if (!exists) {
        throw new Error('Torneo no encontrado')
    }
    
    const validStatuses = ['upcoming', 'active', 'finished']
    if (!validStatuses.includes(newStatus)) {
        throw new Error('Estado inválido. Debe ser: upcoming, active o finished')
    }
    
    return await repository.updateTournament(id, { status: newStatus })
}

async function registerPlayer(tournamentId, playerId) {
    const tournament = await repository.getTournamentById(tournamentId)
    if (!tournament) {
        throw new Error('Torneo no encontrado')
    }
    
    const player = await playerRepository.getPlayerById(playerId)
    if (!player) {
        throw new Error('Jugador no encontrado')
    }
    
    if (!player.isActive) {
        throw new Error('El jugador no está activo')
    }
    
    if (tournament.status !== 'upcoming') {
        throw new Error('Solo se pueden inscribir jugadores a torneos en estado upcoming')
    }
    
    if (tournament.registeredPlayers.length >= tournament.maxPlayers) {
        throw new Error('El torneo está lleno')
    }
    
    if (tournament.registeredPlayers.includes(parseInt(playerId))) {
        throw new Error('El jugador ya está inscrito en este torneo')
    }
    
    if (player.elo < tournament.minElo || player.elo > tournament.maxElo) {
        throw new Error(`El ELO del jugador debe estar entre ${tournament.minElo} y ${tournament.maxElo}`)
    }
    
    tournament.registeredPlayers.push(parseInt(playerId))
    
    return await repository.updateTournament(tournamentId, tournament)
}

async function unregisterPlayer(tournamentId, playerId) {
    const tournament = await repository.getTournamentById(tournamentId)
    if (!tournament) {
        throw new Error('Torneo no encontrado')
    }
    
    if (tournament.status !== 'upcoming') {
        throw new Error('Solo se pueden desinscribir jugadores de torneos en estado upcoming')
    }
    
    const playerIndex = tournament.registeredPlayers.indexOf(parseInt(playerId))
    if (playerIndex === -1) {
        throw new Error('El jugador no está inscrito en este torneo')
    }
    
    tournament.registeredPlayers.splice(playerIndex, 1)
    
    return await repository.updateTournament(tournamentId, tournament)
}

module.exports = {
    createTournament,
    getTournaments,
    getTournamentById,
    updateTournamentStatus,
    registerPlayer,
    unregisterPlayer
}