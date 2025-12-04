const service = require('../services/ownersService')

async function getAllOwners(req, res, next) {
    try {
        const owners = await service.getAllOwners()
        return res.json(owners)
    } catch (error) {
        next(error)
    }
}

async function getOwnerById(req,res,next) {
    try {
        const {id} = req.params
        const owner = await service.getOwnerById(id)
        return res.json(owner)
    } catch (error) {
        next(error)
    }
}

async function createOwner(req, res, next) {
    try {
        const owner = await service.createOwner(req.body)
        return res(201).json(owner)
    } catch (error) {
        next(error)
    }
}

async function deleteOwner(req, res, next) {
    try {
        const {id} = req.params
        const eliminado = await service.deleteOwner(id)
        return res.json(eliminado)
    } catch (error) {
        next(error)
    }
}

async function updateOwner(req, res, next) {
    try {
        const {id} = req.params
        const owner = await service.updateOwner(id, req.body)
        return res.json(owner)
    } catch (error) {
        next(error)
    }
}

module.exports =  {
    updateOwner,
    deleteOwner,
    createOwner,
    getAllOwners,
    getOwnerById
}