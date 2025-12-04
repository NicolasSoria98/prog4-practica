const { create } = require('domain')
const service = require('../services/loanService')

async function createLoan(req, res, next) {
    try {
        const loan = await service.createLoan(req.body)
        res.status(201).json(loan)
    } catch (error) {
        next(error)
    }
}
async function getAllLoans(req, res, next) {
    try {
        const filters = req.query
        const loans = await service.getAllLoans(filters)
        return res.json(loans)
    } catch (error) {
        next(error)
    }
}
async function getLoanById(req, res, next) {
    try {
        const {id} = req.params
        const loan = await service.getLoanById(id)
        return res.json(loan)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getLoanById,
    getAllLoans,
    createLoan
}