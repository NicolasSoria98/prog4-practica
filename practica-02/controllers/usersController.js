const service = require('../services/usersService')

async function createUser(req, res, next) {
    try {
        const user = await service.createUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

async function getAllUsers(req, res, next) {
    try {
    const filters = req.query
    const users = await service.getAllUsers(filters)
    return res.json(users)
    } catch(error) {
        next(error)
    }
}

async function getUserById(req, res, next) {
    try {
        const {id} = req.params
        const user = await service.getUserById(id)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

async function updateUser(req, res, next) {
    try {
        const {id} = req.params
        const user = await service.updateUser(id, req.body)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

async function deleteUser(req, res, next) {
    try {
        const {id} = req.params
        const user = await service.deleteUser(id)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById,
    createUser
}