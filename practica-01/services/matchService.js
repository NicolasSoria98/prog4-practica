const repository = require('../repositories/matchRepository')
const playerRepository = require('../repositories/playerRepository')
const tournamentRepository = require('../repositories/tournamentRepository')
const { calculateNewElo } = require('../utils/eloCalculator')

async function createMatch(data) {
    const whitePlayer = await playerRepository.getPlayerById(data.whitePlayerId)
    const blackPlayer = await playerRepository.getPlayerById(data.blackPlayerId)

    if (!whitePlayer) {
        throw new Error('Jugador con piezas blancas no encontrado')
    }
    if (!blackPlayer) {
        throw new Error('Jugador con piezas negras no encontrado')
    }

    if (!whitePlayer.isActive) {
        throw new Error('El jugador con piezas blancas no está activo')
    }
    if (!blackPlayer.isActive) {
        throw new Error('El jugador con piezas negras no está activo')
    }

    if (data.whitePlayerId === data.blackPlayerId) {
        throw new Error('Un jugador no puede jugar contra sí mismo')
    }

    if (data.tournamentId) {
        const tournament = await tournamentRepository.getTournamentById(data.tournamentId)
        
        if (!tournament) {
            throw new Error('Torneo no encontrado')
        }
        
        if (!tournament.registeredPlayers.includes(parseInt(data.whitePlayerId))) {
            throw new Error('El jugador con piezas blancas no está inscrito en el torneo')
        }
        if (!tournament.registeredPlayers.includes(parseInt(data.blackPlayerId))) {
            throw new Error('El jugador con piezas negras no está inscrito en el torneo')
        }
    }
    
    if (data.duration < 5 || data.duration > 300) {
        throw new Error('La duración debe estar entre 5 y 300 minutos')
    }
    
    if (data.moves < 10 || data.moves > 200) {
        throw new Error('Los movimientos deben estar entre 10 y 200')
    }
    let whiteResult, blackResult
    
    if (data.result === 'white') {
        whiteResult = 1
        blackResult = 0
    } else if (data.result === 'black') {
        whiteResult = 0
        blackResult = 1
    } else if (data.result === 'draw') {
        whiteResult = 0.5
        blackResult = 0.5
    } else {
        throw new Error('Resultado inválido. Debe ser: white, black o draw')
    }
    
    const newWhiteElo = calculateNewElo(whitePlayer.elo, blackPlayer.elo, whiteResult)
    const newBlackElo = calculateNewElo(blackPlayer.elo, whitePlayer.elo, blackResult)

    if (data.result === 'white') {
        await playerRepository.updatePlayer(data.whitePlayerId, {
            elo: newWhiteElo,
            wins: whitePlayer.wins + 1
        })
        await playerRepository.updatePlayer(data.blackPlayerId, {
            elo: newBlackElo,
            losses: blackPlayer.losses + 1
        })
    } else if (data.result === 'black') {
        await playerRepository.updatePlayer(data.whitePlayerId, {
            elo: newWhiteElo,
            losses: whitePlayer.losses + 1
        })
        await playerRepository.updatePlayer(data.blackPlayerId, {
            elo: newBlackElo,
            wins: blackPlayer.wins + 1
        })
    } else {
        await playerRepository.updatePlayer(data.whitePlayerId, {
            elo: newWhiteElo,
            draws: whitePlayer.draws + 1
        })
        await playerRepository.updatePlayer(data.blackPlayerId, {
            elo: newBlackElo,
            draws: blackPlayer.draws + 1
        })
    }
    
    const match = {
        tournamentId: data.tournamentId || null,
        whitePlayerId: parseInt(data.whitePlayerId),
        blackPlayerId: parseInt(data.blackPlayerId),
        result: data.result,
        moves: data.moves,
        duration: data.duration,
        playedAt: new Date().toISOString()
    }
    
    const allMatches = await repository.getAllMatches()
    match.id = allMatches.length > 0
        ? Math.max(...allMatches.map(m => m.id)) + 1
        : 1
    
    return await repository.createMatch(match)
}

async function getMatches(filters = {}) {
    let matches = await repository.getAllMatches()
    
    if (filters.playerId) {
        const playerIdNum = parseInt(filters.playerId)
        matches = matches.filter(m => 
            m.whitePlayerId === playerIdNum || m.blackPlayerId === playerIdNum
        )
    }
    
    if (filters.tournamentId) {
        matches = matches.filter(m => m.tournamentId === parseInt(filters.tournamentId))
    }
    
    if (filters.result) {
        matches = matches.filter(m => m.result === filters.result)
    }
    
    if (filters.minMoves) {
        matches = matches.filter(m => m.moves >= parseInt(filters.minMoves))
    }
    
    if (filters.maxMoves) {
        matches = matches.filter(m => m.moves <= parseInt(filters.maxMoves))
    }
    
    return matches
}

async function getMatchById(id) {
    const match = await repository.getMatchById(id)
    
    if (!match) {
        throw new Error('Partida no encontrada')
    }
    
    return match
}

module.exports = {
    createMatch,
    getMatches,
    getMatchById
}