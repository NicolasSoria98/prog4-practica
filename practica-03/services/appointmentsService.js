const repository = require('../repositories/appointmentsRepository')
const repositoryPets = require('../repositories/petsRepository')
const repositoryOwner = require('../repositories/ownersRepository');
const { create } = require('domain');



async function getAllAppointments() {
    const data = await repository.getAllAppointments();
    return data;
}

async function getAppointmentById(id) {
    const cita = await repository.getAppointmentById(id);
    if(!cita) {
        throw new Error('no encontrada')
    }
    return cita;
}
async function createAppointment(cita) {
    const data = await repository.getAllAppointments();
    if(!cita.petId) {
        throw new Error ('necesita ingresar el id del pet')
    }
    const pet = await repositoryPets.getPetById(cita.petId)
    if(!pet) {
        throw new Error ('no encontrado el pet')
    }
    const appointment = {
        petId: pet.id,
        appointmentDate: cita.appointmentDate,
        reason: cita.reason,
        status: cita.status,
        diagnosis: cita.diagnosis,
        treatment: cita.treatment,
        createdAt: new Date().toISOString(),
        completedAt: null
    }
    appointment.id = data.length > 0
    ? Math.max(...data.map(d => d.id)) +1
    :1
    return await repository.createAppointment(appointment);
}

async function updateAppointment(id, updates) {
    const appointment = await repository.getAppointmentById(id);
    if(!appointment) {
        throw new Error('no encotnrada la cita')
    }
    return await repository.updateAppointment(id, updates)
}

async function deleteAppointment(id) {
    const eliminado = await repository.deleteAppointment(id);
    if(!eliminado) {
        throw new Error('no encotnrada la cita')
    }
    return eliminado
}

module.exports = {
    createAppointment,
    updateAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment
}