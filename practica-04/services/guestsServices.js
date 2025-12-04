repository = require ('../repositories/guestsRepository')

const identificationTypeValidos = ["Pasaporte", "Cédula", "DNI"]

function validateGuest(guest) {
    if(!identificationTypeValidos.includes(guest.identificationType)) {
        throw new Error(`no es un tipo de identificacion valida, debe ser ${identificationTypeValidos.join(', ')})`)
    }
}
async function getAllGuests() {
    const data = await repository.getAllGuests();
    return data
}

async function getGuestById(id) {
    const guest = await repository.getGuestById(id);
    if(!guest) {
        throw new Error('no encontrado pa')
    }
    return guest;
}

async function deleteGuest(id) {
    const exists = await repository.getGuestById(id)
    if(!exists) {
        throw new Error ('no encontrado')
    }
    return await repository.deleteGuest(id);
}

async function updateGuest(id, updates) {
    const exists = await repository.getGuestById(id)
    if(!exists) {
        throw new Error('no encontrado')
    }
    return await repository.updateGuest(id, updates);
}

async function createGuest(guestNuevo) {
    if(!guestNuevo.email || !guestNuevo.name) {
        throw new Error ('son obligatoris el mail y el nombre')
    }
    const data = await repository.getAllGuests()
    const emailExists = data.some(g => g.email.toLowerCase() === guestNuevo.email.toLowerCase())
    if(emailExists) {
        throw new Error('ya existe el mail registrado')
    }
    const identificationNumberExists = data.some(g => g.identificationNumber.toLowerCase() === guestNuevo.identificationNumber.toLowerCase())
    if(identificationNumberExists) {
        throw new Error('ya existe ese numero de identificacion')
    }
    validateGuest(guestNuevo)
    const guest = {
        name: guestNuevo.name,
        email: guestNuevo.email,
        phone: guestNuevo.phone,
        identificationType: guestNuevo.identificationType,
        identificationNumber: guestNuevo.identificationNumber,
        isVip: false,
        registeredAt: new Date().toISOString(),
        totalReservations: guestNuevo.totalReservations
    }
    guest.id = data.length > 0
    ? Math.max(...data.map(g => g.id))+1
    : 1
    return await repository.createGuest(guest);
}

async function updateGuest(id, updates) {
    const guest = await repository.getGuestById(id)
    if(!guest) {
        throw new Error('no encontrado')
    }
    return await repository.updateGuest(id, updates)
}

async function deleteGuest(id) {
    const guest = await repository.getGuestById(id)
    if(!guest) {
        throw new Error('no encontrad')
    }
    return await repository.deleteGuest(id)
}

module.exports = {
    createGuest,
    updateGuest,
    getAllGuests,
    getGuestById,
    deleteGuest
}