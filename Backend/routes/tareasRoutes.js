const express = require('express')
const router = express.Router()
const {getTareas, createTareas, updateTareas, deleteTareas} = require('../controllers/tareasControllers') // funciones 
const protect = require('../middleware/authMiddleware')

// metodos de la api: get, post, put patch (modificar cosas), delete
router.get('/', protect,  getTareas)
router.post('/', protect,  createTareas)

router.put('/:id', protect,  updateTareas)
router.delete('/:id', protect,  deleteTareas)

module.exports = router