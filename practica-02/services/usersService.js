const repository = require('../repositories/usersRepository')

async function createUser(data) {
    if(!data.name || !data.email) {
        throw new Error('se necesita el correo y nombre')
    }
    if(!data.membershipType) {
        throw new Error('se necesita membresia')
    }
    const allUsers = await repository.getAllUsers()
    const emailExists = allUsers.some(u => u.email === data.email)
    if(emailExists) {
        throw new Error('email ya registrado')
    }
    const user =  {
        name: data.name,
        email: data.email,
        membershipType: data.membershipType,
        isActive: true,
        booksCurrentlyBorrowed: 0,
        totalBooksBorrowed: 0,
        registeredAt: new Date().toISOString()
    }
    user.id = allUsers.length > 0 
    ? Math.max(... allUsers.map(u => u.id))+1
    : 1
    return await repository.createUser(user)
}
async function updateUser(id, updates) {
    const user = await repository.getUserById(id)
    if(!user) {
        throw new Error ('no existe')
    }
    return await repository.updateUser(id, updates)
}

async function deleteUser(id) {
    const user = await repository.deleteUser(id)
    if(!user) {
        throw new Error ('no existe')
    }
    return user
}
//falta filtrarlos por isActive
async function getAllUsers(filters = {}) {
    let users = await repository.getAllUsers()
    
    if (filters.membershipType) {
        users = users.filter(u => u.membershipType === filters.membershipType)
    }
    
    if (filters.isActive !== undefined) {
        const active = filters.isActive === 'true'
        users = users.filter(u => u.isActive === active)
    }
    
    return users
}

async function getUserById(id) {
    const user = await repository.getUserById(id)
    if(!user) {
        throw new Error('no existe')
    }
    return user
}

module.exports =  {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    createUser
}