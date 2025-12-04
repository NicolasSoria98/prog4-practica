const repository = require('../repositories/usersRepository')

//falta filtrarlos por isActive
async function getAllUsers(filters= {}) {
    const users = await repository.getAllUsers();
    if(filters.membershipType) {
        users = users.filter(u => u.membershipType === )
    }
}