const repository = require('../repositories/roomsRepository');

const tiposValidos= ['simple', 'doble', 'suite', 'presidencial']

function validateRoom(room) {
    if(!tiposValidos.includes(room.type)) {
        throw new Error(`tipo incorrecto debe ser: ${tiposValidos.join(', ')}`)
    }
}

async function getAllRooms() {
    const rooms = await repository.getAllRooms();
    return rooms;
}

async function getRoomById(id) {
    const room = await repository.getRoomById(id)
    if(!room) {
        throw new Error('no encontrado')
    }
    return room;
}

async function deleteRoom(id) {
    const room = await repository.getRoomById(id)
    if(!room) {
        throw new Error('no encontrado')
    }
    return await repository.deleteRoom(id)
}

async function updateRoom(id, updates) {
    const room = await repository.getRoomById(id)
    if(!room) {
        throw new Error('no encontrado')
    }
    return await repository.updateRoom(id, updates)
}

async function createRoom(roomNuevo) {
    const allrooms = await repository.getAllRooms()
    if(!roomNuevo.number) {
        throw new Error('el numero es obligatorio')
    }
    const numberExists = allrooms.some(r => r.number === parseInt(roomNuevo.number))
    if(numberExists) {
        throw new Error('ya existe ese numero de habitacion')
    }
    validateRoom(room)
    const room = {
        number: roomNuevo.id,
        type: roomNuevo.type,
        capacity: roomNuevo.capacity,
        pricePerNight: roomNuevo.pricePerNight,
        floor: roomNuevo.floor,
        isAvailable: true,
        amenities: roomNuevo.amenities,
        createdAt: new Date().toISOString()
    }
    return await repository.createRoom(room)
}

module.exports = {
    getAllRooms,
    getRoomById,
    deleteRoom,
    updateRoom,
    createRoom
}