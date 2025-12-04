const { create } = require('domain');
const service = require('../services/roomsService')

async function createRoom(req, res, next) {
    try {
        const room = await service.createRoom(req.body);
        res.status(201).json(room)
    } catch (error) {
        next(error)
    }
}

async function updateRoom(req, res, next) {
    try {
        const {id} = req.params;
        const room = await service.updateRoom(id, req.body)
        res.json(room)
    } catch (error) {
        next(error)
    }
}

async function deleteRoom(req, res, next) {
    try {
        const {id} = req.params
        const eliminado = await service.deleteRoom(id)
        res.json(eliminado)
    } catch (error) {
        next(error)
    }
}

async function getAllRooms(req, res, next) {
    try {
        const {filters} = req.query;
        const rooms = await service.getAllRooms(filters)
        res.json(rooms)
    } catch (error) {
        next(error)
    }
}

async function getRoomById(req, res, next) {
    try {
        const {id} = req.params
        const room = await service.getRoomById(id)
        res.json(room)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRooms,
    getRoomById
}