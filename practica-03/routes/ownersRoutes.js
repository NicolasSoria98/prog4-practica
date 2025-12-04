const controller = require('../controllers/ownerController')
const express = require('express')
const router = express.Router()

router.get('/', controller.getAllOwners)
router.get('/:id', controller.getOwnerById)

router.post('/', controller.createOwner)

router.patch('/:id', controller.updateOwner)

router.delete('/:id', controller.deleteOwner)

module.exports = router;
