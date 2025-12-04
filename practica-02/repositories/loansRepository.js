const fs = require('fs').promises;
const path = require('path');

const pathFile = path.join(__dirname, '../data/library.json')

async function readData() {
    try {
        const data = await fs.readFile(pathFile, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return {books: [], users: [], loans: []}
    }
}

async function saveData(data) {
    await fs.writeFile(pathFile, JSON.stringify(data, null, 2))
}

async function getAllLoans() {
    const data = await readData();
    return data.loans
}

async function getLoanById(id) {
    const data = await readData();
    return data.loans.find(l => l.id === parseInt(id))
}

async function createLoan(loan) {
    const data = await readData();
    data.loans.push(loan)
    await saveData(data);
    return loan;
}

async function updateLoan(id, updates) {
    const data = await readData()
    const index = data.loans.findIndex(l => l.id === parseInt(id))
    
    if (index === -1) {
        return null
    }
    
    data.loans[index] = { ...data.loans[index], ...updates }
    await saveData(data)
    return data.loans[index]
}


module.exports = {
    createLoan,
    getAllLoans,
    getLoanById,
    updateLoan
}