const express = require('express')
const router = express.Router()
const controller = require('../controllers/matchController')
const validate = require('../middlewares/validate')
const { createMatchSchema } = require('../validations/matchSchemas')

// GET routes
router.get('/', controller.getMatches)
router.get('/:id', controller.getMatchById)

// POST routes
router.post('/', validate(createMatchSchema), controller.createMatch)

module.exports = router