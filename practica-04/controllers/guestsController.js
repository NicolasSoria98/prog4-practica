const service = require('../services/guestsServices')

async function createGuest(req, res, next) {
    try {
        const guest = await service.createGuest(req.body)
        res.status(201).json(guest)
    } catch (error) {
        next(error)
    }
}

async function getAllGuests() {
    try {
        const guests = await service.getAllGuests()
        res.json(guests)
    } catch (error) {
        next(error)
    }
}

async function getGuestById(req, res, next) {
    try {
        const {id} = req.params
        const guest = await service.getGuestById(id)
        res.json(guest)
    } catch (error) {
        next(error)
    }
}

async function deleteGuest(req,res,next) {
    try {
        const {id} = req.params
        const eliminado = await service.deleteGuest(id)
        res.json(eliminado)
    } catch (error) {
        next(error)
    }
}

async function updateGuest(req,res,next) {
    try {
        const {id} = req.params
        const actualizado = await service.updateGuest(id, req.body)
        res.json(actualizado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllGuests,
    getGuestById,
    updateGuest,
    deleteGuest,
    createGuest
}