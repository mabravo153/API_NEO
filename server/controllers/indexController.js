const indexModel = require('../models/indexModel')

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
        data = await indexModel.create(request)
        console.log(data);
        
    }

    return res.status(data['code']).json(data)

};