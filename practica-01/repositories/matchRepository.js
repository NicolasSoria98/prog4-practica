const fs = require('fs').promises
const path = require('path')

const filePath = path.join(__dirname, '../data/data.json');

async function readData() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { players: [], tournaments: [], matches: [] }   
    }
}

async function saveData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

async function getAllMatches() {
    const data = await readData();
    return data.matches;
}

async function getMatchById(id) {
    const data = await readData();
    return data.matches.find(m => m.id === parseInt(id))
}

async function createMatch(match) {
    const data = await readData();
    data.matches.push(match)
    await saveData(data)
    return match;
}

module.exports = {
    getAllMatches,
    getMatchById,
    createMatch
}