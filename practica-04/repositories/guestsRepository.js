const fs = require('fs').promises
const path = require ('path');

const pathFile= path.join(__dirname, '../data/hotel.json')

async function readData() {
    try {
        const data = fs.readFile(pathFile, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return {guests: [], rooms: [], reservations: []}
    }
}

async function saveData(data) {
    await fs.writeFile(pathFile, JSON.stringify(data, null, 2));
}

async function getAllGuests() {
    const data = await readData();
    return data.guests;
}

async function getGuestById(id) {
    const data = await readData();
    const guest = data.guests.find(g => g.id === intParse(id))
    if(!guest) {
        return null
    }
    return guest
}

async function createGuest(guest) {
    const data = await readData();
    data.guests.push(guest)
    await saveData(data)
    return guest
}

async function updateGuest(id, updates) {
    const data = await readData();
    const index = data.guests.findIndex(g => g.id === parseInt(id))
    if(index === -1) {
        return null
    }
    data.guests[index] = {...data.guests[index], ...updates}
    await saveData(data)
    return data.guest[index]
}

async function deleteGuest(id) {
    const data = await readData();
    const index = data.guests.findIndex(g => g.id === parseInt(id))
    if(index === -1) {
        return null
    }
    const eliminado= data.guests.splice(index, 1)[0]
    await saveData(data)
    return eliminado
}

module.exports = {
    updateGuest,
    createGuest,
    deleteGuest,
    getAllGuests,
    getGuestById
}