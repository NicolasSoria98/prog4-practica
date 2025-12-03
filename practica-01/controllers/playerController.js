const service = require('../services/playerService')

async function createPlayer(req, res, next) {
    try {
        const player = await service.createPlayer(req.body)
        res.status(201).json(player)
    } catch (error) {
        next(error)
    }
}

async function getPlayers(req, res, next) {
    try {
        const filters = req.query
        const players = await service.getPlayers(filters)
        res.json(players)
    } catch (error) {
        next(error)
    }
}

async function getPlayerById(req, res, next) {
    try {
        const { id } = req.params
        const player = await service.getPlayerById(id)
        res.json(player)
    } catch (error) {
        next(error)
    }
}

async function getPlayerStats(req, res, next) {
    try {
        const { id } = req.params
        const stats = await service.getPlayerStats(id)
        res.json(stats)
    } catch (error) {
        next(error)
    }
}

async function updatePlayer(req, res, next) {
    try {
        const { id } = req.params
        const player = await service.updatePlayer(id, req.body)
        res.json(player)
    } catch (error) {
        next(error)
    }
}

async function updatePlayerStatus(req, res, next) {
    try {
        const { id } = req.params
        const { isActive } = req.body
        const player = await service.updatePlayerStatus(id, isActive)
        res.json(player)
    } catch (error) {
        next(error)
    }
}

async function deletePlayer(req, res, next) {
    try {
        const { id } = req.params
        const player = await service.deletePlayer(id)
        res.json({
            mensaje: 'Jugador eliminado',
            jugador: player
        })
    } catch (error) {
        next(error)
    }
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