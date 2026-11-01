const asyncHandler = require ('express-async-handler')  
const Tarea = require('../models/tareasModel')

//asincronia es para realizar tareas en segundo plano 
//async handler es para manejar errores con funciones asincronas (reemplaza a un try catch)

const getTareas = asyncHandler(async(req, res) => { //peticion a api con request y respond 
    const tareas = await Tarea.find({user: req.user.id}) //va a buscar todas las tareas
    res.status(200).json({tareas}) // 200 es que todo salio bien (ver mensajes gatos HTML)
})

const createTareas = asyncHandler(async(req, res) => { 
    if (!req.body.descripcion){ // si en el body no hay descripcion
        res.status(400) // 400 es bad request
        throw new Error("Por favor teclea la descripcion")
    }

    const tarea = await Tarea.create({
        user: req.user.id_usuario,
        descripcion: req.body.descripcion,
    })

    res.status(201).json({tarea}) 
})

const updateTareas = asyncHandler(async(req, res) => { 

    const tarea = await Tarea.findById(req.params.id) // parametro que esta en tareasRoutes "id"

    if(!tarea){
        res.status(404)
        throw new Error ("La tarea especificada no se encuentra")
    } else {
        //verificar que la tarea exista y que pertenece al usuario del jwt
        if (tarea.user.toString() !== req.user.id){
            res.status(401)
            throw new Error("Acceso no autorizado")
        } else {
            const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).json(tareaUpdated)
        }
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(tareaUpdated) 
})

const deleteTareas = asyncHandler(async(req, res) => { 

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea){
        res.status(404)
        throw new Error ("La tarea especificada no se encuentra")
    }else {
        //verificar que la tarea exista y que pertenece al usuario del jwt
        if (tarea.user.toString() !== req.user.id){
            res.status(401)
            throw new Error("Acceso no autorizado")
        } else {
            await tarea.deletOne()
            res.status(200).json({id: req.params.id})
        }
    }
})

module.exports = {getTareas, createTareas, updateTareas, deleteTareas}