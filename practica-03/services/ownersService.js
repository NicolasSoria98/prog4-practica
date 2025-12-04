const repository = require('../repositories/ownersRepository')

async function createOwner(owner) {
    const data = await repository.getAllOwners();
    const emailExists = data.some(o => o.email.toLowerCase() === owner.email.toLowerCase())
    if(emailExists) {
        throw new Error('email ya registrado')
    }
    const telefonoExists = data.some(o => o.phone === parseInt(owner.phone))
    if(telefonoExists) {
        throw new Error('telefono ya registrado')
    }
    if(owner.phone.length > 10 || owner.phone.length <10) {
        throw new Error ('telefono invalido')
    }
    const ownerNuevo = {
        name: owner.name,
        phone: owner.phone,
        email: owner.email,
        address: owner.address,
        registeredAt: new Date().toISOString(),
        totalPets: 0
    }
    ownerNuevo.id = data.length > 0
    ? Math.max(...data.map(o => o.id)) + 1
    : 1

    return await repository.createOwner(ownerNuevo)
}

async function getAllOwners() {
    const data = await repository.getAllOwners();
    return data
}

async function getOwnerById(id) {
    const owner = await repository.getOwnerById(id);
    if(!owner) {
        throw new Error('no encontrado')
    }
    return owner
}
async function updateOwner(id, updates){
    const owner = await repository.getOwnerById(id);
    if(!owner) {
        throw new Error('no encontrado')
    }
    if(updates.email) {
        const data = await repository.getAllOwners();
        const emailTaken = data.some(o=> o.email.toLowerCase() === update.email.toLowerCase())
        if(emailTaken) {
            throw new Error ('ya registrado el mail')
        }
    }
    if (updates.phone) {
        const data = await repository.getAllOwners();
        const phoneTaken = data.some(o=> o.phone === parseInt(updates.phone))
        if(phoneTaken) {
            throw new Error('telefono ya usado')
        }
    }
    return await repository.updateOwner(id, updates)
}
//falta agregarle que no se pueda si tiene mascotas
async function deleteOwner(id) {
    const eliminado = await repository.deleteOwner(id)
    if(!eliminado) {
        throw new Error('no encontrado')
    }
    const pets = await petRepository.getAllPets()
    const hasPets = pets.some(p => p.ownerId === parseInt(id))
    if(hasPets) {
        throw new Error('No se puede eliminar un dueño con mascotas registradas')
    }
    return eliminado
}

module.exports = {
    createOwner,
    updateOwner,
    getAllOwners,
    getOwnerById,
    deleteOwner
}
