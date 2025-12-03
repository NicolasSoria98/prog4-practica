const service = require('../services/tournamentService')

async function createTournament(req, res, next) {
    try {
        const tournament = await service.createTournament(req.body)
        res.status(201).json(tournament)
    } catch (error) {
        next(error)
    }
}

async function getTournaments(req, res, next) {
    try {
        const filters = req.query
        const tournaments = await service.getTournaments(filters)
        res.json(tournaments)
    } catch (error) {
        next(error)
    }
}

async function getTournamentById(req, res, next) {
    try {
        const { id } = req.params
        const tournament = await service.getTournamentById(id)
        res.json(tournament)
    } catch (error) {
        next(error)
    }
}

async function updateTournamentStatus(req, res, next) {
    try {
        const { id } = req.params
        const { status } = req.body
        const tournament = await service.updateTournamentStatus(id, status)
        res.json(tournament)
    } catch (error) {
        next(error)
    }
}

async function registerPlayer(req, res, next) {
    try {
        const { id } = req.params
        const { playerId } = req.body
        const tournament = await service.registerPlayer(id, playerId)
        res.json(tournament)
    } catch (error) {
        next(error)
    }
}

async function unregisterPlayer(req, res, next) {
    try {
        const { id, playerId } = req.params
        const tournament = await service.unregisterPlayer(id, playerId)
        res.json(tournament)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createTournament,
    getTournaments,
    getTournamentById,
    updateTournamentStatus,
    registerPlayer,
    unregisterPlayer
}