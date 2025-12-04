const { create } = require('domain')
const service = require('../services/petsService')

async function createPet(req, res, next) {
    try {
        pet = await service.createPet(req.body)
        return res(201).json(pet)
    } catch (error) {
        next(error)
    }
}
async function getAllPets(req, res, next) {
    try {
        filters = req.query
        pets = await service.getAllPets(filters)
        return res.json(pets)
    } catch (error) {
        next(error)
    }
}
async function getPetById(req, res, next) {
    try {
        const {id} = req.params
        pet = await service.getPetById(id)
        res.json(pet)
    } catch (error) {
        next(error)
    }
}

async function deletePet(req, res, next) {
    try {
        const {id} = req.params
        eliminado =await service.deletePet(id)
        res.json(eliminado)
    } catch (error) {
        next(error)
    }
}

async function updatePet(req, res, next) {
    try {
        const{id} = req.params
        actualizado = await service.updatePet(id)
        res.json(actualizado)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    updatePet,
    deletePet,
    createPet,
    getAllPets,
    getPetById
}