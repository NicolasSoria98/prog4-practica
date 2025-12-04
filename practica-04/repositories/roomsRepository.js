const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/hotel.json')

async function readData() {
    try {
        data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return {guests: [], rooms: [], reservations: []}
    }
}

async function saveData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

async function getAllRooms() {
    const data = await readData();
    return data.rooms;
}

async function getRoomById(id) {
    const data = await readData();
    const room = data.rooms.find(r => r.id === parseInt(id))
    if(!room) {
        return null
    }
    return room
}

async function createRoom(room) {
    const data = await readData();
    data.rooms.push(room);
    await saveData(data);
    return room;
}

async function updateRoom(id,updates) {
    const data = await readData();
    const index = data.rooms.findIndex(r => r.id === parseInt(id))
    if(index === -1) {
        return null
    }
    data.rooms[index] = {...data.rooms[index], ...updates}
    await saveData(data)
    return data.rooms[index]
}

async function deleteRoom(id) {
    const data = await readData();
    const index = data.rooms.findIndex(r => r.id === parseInt(id))
    if(index === -1) {
        return null
    }
    const eliminado = data.rooms.splice(index, 1)[0]
    await saveData(data)
    return eliminado
}

module.exports = {
    deleteRoom,
    updateRoom,
    getAllRooms,
    getRoomById,
    createRoom
}