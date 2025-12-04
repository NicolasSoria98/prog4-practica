const service = require('../services/appointmentsService')

async function createAppointment(req, res, next) {
    try {
        const nuevo = await service.createAppointment(req.body)
        res(201).json(nuevo)
    } catch (error) {
        next(error)
    }
}

async function getAllAppointments(req, res, next) {
    try {
        const data = await service.getAllAppointments();
        res.json(data)
    } catch (error) {
        next(error)
    }
}

async function getAppointmentById(req, res, next) {
    try {
        const {id} = req.params
        const appointment= await service.getAppointmentById(id)
        res.json(appointment)
    } catch (error) {
        next(error)
    }
}

async function deleteAppointment(req, res, next) {
    try {
        const {id} = req.params
        const eliminado = await service.deleteAppointment(id)
        res.json(eliminado)
    } catch (error) {
        next(error)
    }
}

async function updateAppointment (req, res, next) {
    try {
        const {id} = req.params
        const actualizado = await service.updateAppointment(id, req.body);
        res.json(actualizado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    updateAppointment,
    deleteAppointment,
    createAppointment,
    getAllAppointments,
    getAppointmentById
}