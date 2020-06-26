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