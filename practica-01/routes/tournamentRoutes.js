const express = require('express')
const router = express.Router()
const controller = require('../controllers/tournamentController')
const validate = require('../middlewares/validate')
const { createTournamentSchema, updateTournamentStatusSchema, registerPlayerSchema } = require('../validations/tournamentSchemas')

// GET routes
router.get('/', controller.getTournaments)
router.get('/:id', controller.getTournamentById)

// POST routes
router.post('/', validate(createTournamentSchema), controller.createTournament)
router.post('/:id/register', validate(registerPlayerSchema), controller.registerPlayer)

// PATCH routes
router.patch('/:id/status', validate(updateTournamentStatusSchema), controller.updateTournamentStatus)

// DELETE routes
router.delete('/:id/register/:playerId', controller.unregisterPlayer)

module.exports = router