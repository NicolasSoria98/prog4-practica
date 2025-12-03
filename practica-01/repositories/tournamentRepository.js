const fs = require('fs').promises
const path = require('path')

const pathFile = path.join(__dirname, '../data/data.json');

async function readData() {
    try {
    const data = await fs.readFile(pathFile, 'utc-8');
    return JSON.parse(data);
    } catch (error) {
     return {players: [], tournaments:[], matches:[] }   
    }
}

async function saveData(data) {
    await fs.writeFile(pathFile, JSON.stringify(data, null, 2))
}

async function getAllTournaments() {
    const data = await readData();
    return data.tournaments;
}

async function getTournamentById(id) {
    const data = await readData();
    return data.tournaments.find(t => t.id === parseInt(id))
}

async function createTournament(tournament) {
    const data = await readData();
    data.tournaments.push(tournament)
    await saveData(data)
    return tournament;
}

async function updateTournament(id, updates) {
    const data = await readData();
    const index = data.tournaments.findIndex(t => t.id === parseInt(id));
    if(index === -1) return null;

    data.tournaments[index] = {...data.tournaments[index], ...updates};
    await saveData(data);
    return data.tournaments[index]
}

async function deleteTournament(id) {
    const data = await readData();
    const index = data.tournaments.findIndex(t => t.id === parseInt(id));
    if(index === -1) return null;

    const deleted = data.tournaments.splice(index, 1)[0];
    await saveData(data);
    return deleted;
}

module.exports = {
    getAllTournaments,
    getTournamentById,
    updateTournament,
    deleteTournament,
    createTournament
}