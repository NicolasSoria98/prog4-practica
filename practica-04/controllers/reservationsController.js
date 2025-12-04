const service = require('../services/reservationsService');

async function getAllReservations(req, res, next) {
    try {
        reservas = await service.getAllReservations()
        res.json(reservas)
    } catch (error) {
        next(error)
    }
}

async function getReservationById(req, res, next) {
    try {
        const {id} = req.params
        const reserva = await service.getReservationById(id)
        res.json(reserva)       
    } catch (error) {
        next(error)
    }
}

async function createReservation(req, res, next) {
    try {
        const reserva = await service.createReservation(req.body)
        res.status(201).json(reserva)
    } catch (error) {
        next(error)
    }
}

async function deleteReservation(req, res, next) {
    try {
        const {id} = req.params
        const eliminado = await service.deleteReservation(id)
        res.json(eliminado)
    } catch (error) {
        next(error)
    }
}

async function updateReservation(req,res,next) {
    try {
        const {id} = req.params
        const actualizado = await service.updateReservation(id)
        res.json(actualizado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    updateReservation,
    deleteReservation,
    createReservation,
    getAllReservations,
    getReservationById
}