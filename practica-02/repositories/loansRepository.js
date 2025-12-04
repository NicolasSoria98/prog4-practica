const fs = require('fs').promises;
const path = require('path');

const pathFile = path.join(__dirname, '../data/library.json')

async function readData() {
    try {
        data = await fs.readFile(pathFile, 'utf-8')
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
    return loan = data.loan.find(l => l.id === parseInt(id))
}

async function createLoan(loan) {
    const data = await readData();
    data.loan.push(loan)
    await saveData();
    return loan;
}


module.exports = {
    createLoan,
    getAllLoans,
    getLoanById
}