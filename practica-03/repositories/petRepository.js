const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/veterinary.json')

async function readData() {
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return {owners: [], pets: [], appointments: []}
    }
}

async function saveData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

async function getAllPets() {
    const data = await readData()
    return data.pets;
}

async function getPetById(id) {
    const data = await readData()
    return data.pets.find(p => p.id === parseInt(id))
}

async function createPet(pet) {
    const data = await readData()
    data.pets.push(pet)
    await saveData(data)
    return pet
}

async function updatePet(id, updates) {
    const data = await readData()
    const index = data.pets.findIndex(p => p.id === parseInt(id))
    if(!index) {
        return null
    }
    data.pets[index] = {...data.pets[index], ...updates}
    await saveData(data)
    return data.pets[index]
}
async function deletePet(id) {
    const data = await readData()
    const index = data.pets.findIndex(p => p.id === parseInt(id))
    if(!index) {
        return null
    }
    const eliminado = data.pets.splice(index, 1)[0]
    await saveData(data)
    return eliminado
}

module.exports = {
    createPet,
    getAllPets,
    getPetById,
    updatePet,
    deletePet
}