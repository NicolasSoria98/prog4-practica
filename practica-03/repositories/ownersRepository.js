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

async function getAllOwners() {
    const data = await readData();
    return data.owners;
}

async function getOwnerById(id) {
    const data = await readData()
    return data.owners.find(o => o.id === parseInt(id))
}

async function createOwner(owner) {
    const data = await readData();
    data.owners.push(owner);
    await saveData(data)
    return owner
}

async function updateOwner(id, updates) {
    const data = await readData();
    const index = data.owners.findIndex(o => o.id === parseInt(id))
    if(index === -1) {
        return null
    }
    data.owners[index] = {...data.owners[index], ...updates}
    await saveData(data);
    return data.owners[index]
}

async function deleteOwner(id) {
    const data = await readData();
    const index = data.owners.findIndex(o => o.id === parseInt(id))
    if(index === -1) {
        return null
    }
    const deleted = data.owners.splice(index, 1)[0]
    await saveData(data)
    return deleted
}

module.exports = {
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner,
    createOwner
}