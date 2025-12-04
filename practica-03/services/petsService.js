const { create } = require('domain');
const repository = require('../repositories/petRepository')

async function getAllPets() {
    const data = await repository.getAllPets();
    return data
}
async function getPetById(id) {
    const pet = await repository.getPetById(id)
    if(!pet) {
        throw new Error('no encontrado')
    }
    return pet
}
async function createPet(data) {
    const data = await repository.getAllPets();
    if(!data.ownerId) {
        throw new Error('necesita tener un dueño')
    }
    if(data.age > 30 || data.age < 0) {
        throw new Error ('edad invalida')
    }
    const pet = {
        name: data.name,
        species: data.species,
        breed: data.breed,
        weight: data.weight,
        ownerId: data.ownerId,
        medicalStatus: data.medicarlStatus,
        lastCheckup: null,
        registeresAt: new Date().toISOString()
    }
    pet.id = data.length > 0
    ? Math.max(...data.map(d => d.id)) + 1
    : 1
    return await repository.createPet(pet);
}
async function updatePet(id, updates) {
    const pet = await repository.getPetById(id)
    if(!pet) {
        throw new Error('no encontrado')
    }
    return await repository.updatePet(id, updates)
}

async function deletePet(id) {
    const eliminado = await repository.deletePet(id) 
    if(!pet) {
        throw new Error('no encontrado')
    }
    return eliminado
}

module.exports = {
    createPet,
    getAllPets,
    getPetById,
    updatePet,
    deletePet
}