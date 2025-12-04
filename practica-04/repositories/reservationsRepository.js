const fs = require('fs').promises;
const { create } = require('domain');
const path = require('path');

const filePath = path.join(__dirname, '../data/hotel.json')

async function readData() {
    try {
        const data = fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return {guests: [], rooms: [], reservations: []}
    }
}

async function saveData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

async function getAllReservations() {
    const data = await readData();
    return data.reservations;
}

async function getReservationById(id) {
    const data = await readData()
    const reservation = data.reservations.find(r => r.id === parseInt(id))
    if(!reservation) {
        return null
    }
    return reservation;
}

async function updateReservation(id, updates) {
    const data = await readData()
    const index = data.reservations.findIndex(r => r.id === id);
    if(!index) {
        return null
    }
    data.reservation[index] = {...data.reservation[index], updates}
    await saveData(data)
    return data.reservation[index]
}

async function deleteReservation (id) {
    const data = await readData()
    const index = data.reservations.findIndex(r => r.id === id);
    if(!index) {
        return null
    }
    eliminado = data.reservations.splice(index, 1)[0]
    await saveData(data)
    return eliminado;
}

async function createReservation(reserva) {
    const data = await readData()
    data.reservations.push(reserva)
    await saveData(data)
    return reserva;
}

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation,
    getAllReservations,
    getReservationById
}