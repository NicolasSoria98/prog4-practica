const express = require('express')
const router = express.Router()
const controller = require('../controllers/petsController')

router.get('/', controller.getAllPets)
router.get('/:id', controller.getPetById)

router.patch ('/:id', controller.updatePet)

router.post('/', controller.createPet)

router.delete('/:id', controller.deletePet)

module.exports = router;