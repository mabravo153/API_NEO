const connect = require('../config')


exports.create = async (request) => {

    const driver = await connect()
    const { nombre, apellido, id } = request
    let data;

    if(driver){
        const session = driver.session({
            database: 'proyectoneo'
        })

        try {
           const query = await session.writeTransaction(tx => 
            tx.run(
                'create (p1 :Person {id: $id, name: $nombre, lastname: $apellido }) return p1', { nombre, apellido, id }
            ))

            const records = query.records[0]._fields[0].properties

            data = {
                code: 200,
                msg: records
            }

        } catch (error) {
            data = {
                code: 500,
                msg: error
            }
        }finally{
            await session.close()
            await driver.close()
        }
       
    }else {
        data = {
            code: 502,
            msg: "502 Bad Gateway"
        }
    }

    return data

}

exports.getAllUsers = async () => {

    const driver = await connect()

    let data;

    if(driver){

        const session = driver.session({ database: 'proyectoneo'})

        try {  

            const query = await session.readTransaction(tx => 
                tx.run(
                    'MATCH (users :Person) return users LIMIT 50'
                ))

                const records = query.records
                const Promisefields = Promise.resolve(records.map(element => element._fields[0].properties))
                
                const fields = await Promisefields
               
                data = {
                    code: 200,
                    msg: fields
                }

                
        } catch (error) {
            data = {
                code: 500,
                msg: error
            }
        }finally{
            await session.close()
            await driver.close()
        }

    }else {

        data = {
            code: 502,
            msg: "502 Bad Gateway"
        }

    }


    return data
}

exports.updateUser = async (id, request) => {

    const driver = await connect()
    let data; 

    const { nombre, apellido } = request

    if(driver){

        const session = driver.session({ database: 'proyectoneo' })

        try {
            
            const query = await session.readTransaction(tx => 
                tx.run(
                    'MATCH (p :Person { id: $id }) SET p = { id: $id, name: $nombre, lastname: $apellido } return p',
                    { id, nombre, apellido }
                ))

            if (!query.records.length) {
                
                data = {
                    code: 404,
                    msg: 'User not found'
                }
            }else{

                const field = query.records[0]._fields

                data = {
                    code: 200,
                    msg: field
                }
            }
            

        } catch (error) {
            data = {
                code: 503,
                msg: error
            }
        }finally{
            await session.close()
            await driver.close()
        }


    }else{
        data = {
            code: 502,
            msg: "502 Bad Gateway"
        }
    }

    return data; 

}