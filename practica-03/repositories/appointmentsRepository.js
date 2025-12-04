const fs = require('fs').promises;
const path = require('path');

const pathFile = path.join(__dirname, '../data/veterinary.json');

async function readData() {
    try {
        const data =await fs.readFile(pathFile, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return {owners: [], pets: [], appointments: []}
    }
}

async function saveData(data) {
   await  fs.writeFile(pathFile, JSON.stringify(data, null, 2))
}

async function getAllAppointments() {
    const data = await readData();
    return data.appointments;
}

async function getAppointmentById(id) {
    const data = await readData();
    const appointment = data.appointments.find(a => a.id === parseInt(id))
    if(!appointment) {
        return null
    }
    return appointment
}

async function createAppointment(cita) {
    const data = await readData();
    data.appointments.push(cita);
    await saveData(data)
    return cita;
}

async function updateAppointment(id, updates) {
    const data = await readData();
    const index = data.appointments.findIndex(a => a.id === parseInt(id))
    if(index===-1) {
        return null
    }
    data.appointments[index] = {...data.appointments[index], ...updates}
    await saveData(data)
    return data.appointments[index]
}

async function deleteAppointment(id) {
    const data = await readData()
    const index = data.appointments.findIndex(a => a.id === parseInt(id))
    if(index===-1) {
        return null
    }
    const eliminado = data.appointments.splice(index, 1)[0]
    await saveData(data)
    return eliminado
}

module.exports =  {
    updateAppointment,
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment
}