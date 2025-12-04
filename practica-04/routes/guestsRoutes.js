const express = require('express');
const router = express.Router()
const controller = require('../controllers/guestsController')

router.get('/', controller.getAllGuests)
router.get('/:id', controller.getGuestById)
router.patch('/:id', controller.updateGuest)
router.post('/', controller.createGuest)
router.delete('/:id', controller.deleteGuest)

module.exports = router;