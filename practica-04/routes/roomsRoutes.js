const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomsController')

router.get('/', controller.getAllRooms)
router.get('/:id', controller.getRoomById)

router.patch('/:id', controller.updateRoom)

router.post('/', controller.createRoom)

router.delete('/:id', controller.deleteRoom)

module.exports = router;