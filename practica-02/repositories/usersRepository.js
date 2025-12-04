const fs = require('fs').promises;
const path = require('path');

const pathFile = path.join(__dirname, '../data/library.json')

async function readData() {
    try {
        const data = await fs.readFile(pathFile, 'utc-8')
        return JSON.parse(data)
    } catch (error) {
        return {books: [], users: [], loans: []}
    }
}

async function saveData(data) {
    await fs.writeFile(pathFile, JSON.stringify(data, null, 2));
}

async function getAllUsers() {
    const data = await readData()
    return data.users
}

async function getUserById(id) {
    const data = await readData()
    return data = data.users.find( u=> u.id === parseInt(id))
}

async function createUser(user) {
    const data = await readData()
    data.users.push(user)
    await fs.saveData(data)
    return user;
}

async function updateUser(id, updates) {
    const data = await readData()
    index = data.users.findIndex(u => u.id === parseInt(id))
    if(index === -1) {
        return null
    }
    data.users[index] = {...data.users[index], ...updates}
    await fs.saveData(data)
    return data.users[index]
}

async function deleteUser(id) {
    const data = await readData()
    index = data.users.findIndex(u => u.id === parseInt(id))
    if(index === -1) {
        return null
    }
    deleted = data.users.splice(index, 1)[0]
    await fs.saveData(data)
    return deleted
}

module.exports = {
    deleteUser,
    updateUser,
    createUser,
    getAllUsers,
    getUserById
}