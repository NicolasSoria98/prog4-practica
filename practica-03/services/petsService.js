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
async function createPet(petData) {
    const allPets = await repository.getAllPets();
    if(!petData.ownerId) {
        throw new Error('necesita tener un dueño')
    }
    if(petData.age > 30 || petData.age < 0) {
        throw new Error ('edad invalida')
    }
    const pet = {
        name: petData.name,
        species: petData.species,
        breed: petData.breed,
        weight: petData.weight,
        ownerId: petData.ownerId,
        medicalStatus: petData.medicarlStatus,
        lastCheckup: null,
        registeresAt: new Date().toISOString()
    }
    pet.id = allpets.length > 0
    ? Math.max(...allpets.map(d => d.id)) + 1
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
    if(!eliminado) {
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