const express = require('express');
const router = express.Router()
const controller = require('../controllers/reservationsController')

router.get('/', controller.getAllReservations)
router.get('/:id', controller.getReservationById)

router.post('/', controller.createReservation)

router.patch('/:id', controller.updateReservation)

router.delete('/:id', controller.deleteReservation)

module.exports = router;