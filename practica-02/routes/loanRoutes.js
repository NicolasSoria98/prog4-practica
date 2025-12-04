const express = require('express');
const router = express.Router()
const controller = require('../controllers/loanController')

router.get('/', controller.getAllLoans)
router.get('/:id', controller.getLoanById)
router.post('/', controller.createLoan)

module.exports = router;