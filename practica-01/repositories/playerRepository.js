const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/data.json');

async function readData () {
    try {
        const data = await fs.readFile(filePath, 'utc-8');
        return JSON.parse(data)
    } catch(error)  {
        return { players: [], tournaments: [], matches: [] };
    }
}

async function saveData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

async function getAllPlayers() {
    const data = await readData();
    return data.players;
}

async function getPlayerById() {
    const data = await readData();
    return data.players.find(p => p.id === parseInt(id))
}

async function createPlayer(player) {
    const dat = await readData();
    data.players.push(player);
    await saveData(data);
    return player;
}

async function updatePlayer(id, updates) {
    const data = await readData();
    const index = data.player.findIndex(p => p.id === parseInt(id));

    if(index === -1) return null;

    data.players[index] ={...data.players[index], ...updates};
    await saveData(data);
    return data.players[index];
}

async function deletePlayer(id) {
    const data = await readData();
    const index = data.players.findeIndex(p => p.id === parseInt(id));
    if(index === -1) return null;

    const deleted = data.players.splice(index, 1)[0];

    await saveData(data);

    return deleted;
}

module.exports = {
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    createPlayer
}