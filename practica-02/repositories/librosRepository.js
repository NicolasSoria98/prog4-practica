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

async function getAllBooks() {
    const data = await readData();
    return data.books;
}

async function getBookById(id) {
    const data = await readData();
    return data.books.find(b => b.id === parseInt(id))
}

async function createBook(book) {
    const data = await readData();
    data.books.push(book)
    await saveData(data);
    return book;
}

async function updateBook(id, updates) {
    const data = await readData();
    index = data.books.findIndex(b => b.id === parseInt(id));
    if(index === -1) {
        return null;
    }
    data.books[index] = {...data.books[index], ...updates}
    await saveData(data);
    return data.books[index]
}

async function deleteBook(id) {
    const data = await readData();
    index = data.books.findIndex(b => b.id === parseInt(id));
    if(index === -1) {
        return null;
    }
    deleted = data.books.splice(index,1)[0]
    await saveData(data);
    return deleted;
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getBookById
}