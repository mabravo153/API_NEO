const indexModel = require('../models/indexModel')
const uuid = require('uuid')

exports.store = async (req, res) => {

    const request = req.body
    let errores = []
    let data;

    if(!request.nombre){
        errores.push('El nombre es requerido')
    }
    
    if(!request.apellido){
        errores.push('El apelido es requerido')
    }

    if(errores.length){
        data = {
            code: 400, 
            msg: errores
        }
    }else{

        request.id = uuid.v4()
       

        data = await indexModel.create(request)    
    }

    return res.status(data['code']).json(data)

};

exports.show = async (req, res) => {

    const data = await indexModel.getAllUsers()
 
    return res.status(data['code']).json(data)

}

exports.update = async (req, res) => {

    const request = req.body
    const id = req.params.id 
    let errores = []
    let data; 

    if(!request.nombre){
        errores.push('El nombre es necesario')
    }
    if(!request.apellido){
        errores.push('El apellido es necesario')
    }

    if(!errores.length){

        data = await indexModel.updateUser(id, request)

    }else{
        data = {
            code: 400,
            msg: errores
        }
    }

    return res.status(data['code']).json(data)

}

exports.showUser = async (req, res) => {

    const id = req.params.id

    const data = await indexModel.getUserById(id)

    return res.status(data['code']).json(data)

}

exports.delete = async (req, res) => {

    const id = req.params.id
    let data = await indexModel.removeUser(id)

    return res.status(data['code']).json(data)

}

exports.storeOrder = async (req, res) => {

    const idUser = req.params.id
    const request = req.body 
    let errores = []
    let data;

    if(!request.precio){
        errores.push('El precio es requerido')
    }
    if(!request.producto){
        errores.push('El producto es requerido')
    }
    if(!request.cantidad){
        errores.push('La cantidad del producto es requerida')
    }

    if(errores.length){
        data = {
            code: 400,
            msg: errores
        }
    }else{

        request.idOrder = uuid.v4()
        request.date = new Date().toISOString()

        data = await indexModel.createOrder(idUser, request)

    }

    return res.status(data['code']).json(data)

}