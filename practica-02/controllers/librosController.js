const service = require('../services/librosService');

async function createBook(req, res, next) {
   try {
    const book = await service.createBook(req.body);
    res.status(201).json(book);
   } catch (error) {
    next(error)
   } 
}

async function getAllBooks(req, res, next) {

    try {
        const filters = req.query
        const books = await service.getAllBooks(filters);
        res.json(books)
    } catch (error) {
        next(error)
    }
}

async function getBookById(req, res, next) {
    try {
        const {id} = req.params
        const book = await service.getBookById(id)
        res.json(book)
    } catch (error) {
        next(error)
    }
}

async function updateBook(req, res, next) {
    try {
        const{id} = req.params
        const book = await service.updateBook(id, req.body)
        res.json(book)
    } catch (error) {
        next(error)
    }
}

async function deleteBook(req, res, next) {
    try {
        const{id} = req.params
        const book = await service.deleteBook(id)
        res.json(book)
    } catch(error) {
        next(error)
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    deleteBook,
    updateBook
}