const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentsController')

router.get ('/', controller.getAllAppointments)
router.get('/:id', controller.getAppointmentById)
router.patch('/:id', controller.updateAppointment)
router.post('/', controller.createAppointment)
router.delete('/:id', controller.deleteAppointment)

module.exports = router;