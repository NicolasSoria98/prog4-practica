const service = require('../services/matchService')

async function createMatch(req, res, next) {
    try {
        const match = await service.createMatch(req.body)
        res.status(201).json(match)
    } catch (error) {
        next(error)
    }
}

async function getMatches(req, res, next) {
    try {
        const filters = req.query
        const matches = await service.getMatches(filters)
        res.json(matches)
    } catch (error) {
        next(error)
    }
}

async function getMatchById(req, res, next) {
    try {
        const { id } = req.params
        const match = await service.getMatchById(id)
        res.json(match)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createMatch,
    getMatches,
    getMatchById
}