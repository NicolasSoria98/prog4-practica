const { error } = require('console')

repository = require('../repositories/reservationsRepository')
repositoryGuests = require('../repositories/guestsRepository')
repositoryRooms = require('../repositories/roomsRepository')

async function reservaValidate(reserva) {
    const reservas = await repository.getAllReservations()
    const room = await repository.getRoomById(reserva.roomId)
    const exists = reservas.find(r => r.roomId === parseInt(reservaId.roomId));
    if(exists) {
        throw new Error('la hab ya esta reservada')
    }
    if(reserva.numberOfGuests > room.capacity) {
        throw new Error('hay mas huespedes que capacidad de la hab')
    }
}

async function createReservation(nuevaReserva) {
    if(!nuevaReserva.guestId || !nuevaResetca.roomId) {
        throw new Error ('son obligatorios el id del huesped y la hab')
    }
    if(checkInDate >  checkOutDate) {
        throw new Error('fecha de entrada y salida invalidas')
    }
    const guest = await repositoryGuests.getGuestById(nuevaReserva.guestId)
    const room = await repositoryRooms.getRoomById(nuevaReserva.roomId)
    if(!guest || !room) {
        throw new Error('no existe el huesped o la habitacion')
    }
    if(room.isAvailable === false) {
        throw new Error('no esta disponible la hab')
    }
    await reservaValidate(nuevaReserva)
    reserva = {
        guestId: nuevaReserva.guestId,
        roomId: nuevaReserva.roomId,
        checkInDate: nuevaReserva.checkInDate,
        checkOutDate: nuevaReserva.checkOutDate,
        numberOfGuests: nuevaReserva.numberOfGuests,
        status: 'active',
        specialRequests: nuevaReserva.specialRequests,
        createdAt: new Date().toISOString(),
        completedAt: null
    }

    return await repository.createReservation(reserva)
}

async function getAllReservations() {
    const reservas = await repository.getAllReservations()
    return reservas;
}

async function getReservationById(id) {
    const reserva = await repository.getReservationById(id);
    if(!reserva) {
        throw new Error('no existe la reserva o no se encuenta')
    }
    return reserva;
}

async function deleteReservation(id) {
    const exist = await repository.updateReservation(id)
    if(!exist) {
        throw new Error('no se ha encontrado')
    }
    return await repository.deleteReservation(id);
}

async function updateReservation(id, updates) {
    const exist = await repository.updateReservation(id)
    if(!exist) {
        throw new Error('no se ha encontrado')
    }
    return await repository.updateReservation(id, updates)
}

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation,
    getAllReservations,
    getReservationById
}