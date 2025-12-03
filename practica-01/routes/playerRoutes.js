const express = require('express')
const router = express.Router()
const controller = require('../controllers/playerController')
const validate = require('../middlewares/validate')
const { createPlayerSchema, updatePlayerSchema } = require('../validations/playerSchemas')

// GET routes (sin validación)
router.get('/', controller.getPlayers)
router.get('/:id', controller.getPlayerById)
router.get('/:id/stats', controller.getPlayerStats)

// POST routes (con validación)
router.post('/', validate(createPlayerSchema), controller.createPlayer)

// PATCH routes (con validación)
router.patch('/:id', validate(updatePlayerSchema), controller.updatePlayer)
router.patch('/:id/status', controller.updatePlayerStatus)

// DELETE routes
router.delete('/:id', controller.deletePlayer)

module.exports = router