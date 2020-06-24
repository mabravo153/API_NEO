const connect = require('../config')


exports.create = async (request) => {

    const driver = await connect()
    const { nombre, apellido } = request
    let data;

    if(driver){
        const session = driver.session({
            database: 'proyectoneo'
        })

        try {
           const query = await session.writeTransaction(tx => 
            tx.run(
                'create (p1 :Person { name: $nombre, lastname: $apellido }) return p1', { nombre, apellido }
            ))

            const records = query.records[0]._fields


            data = {
                code: 200,
                msg: records
            }

        } catch (error) {
            data = {
                code: 500,
                msg: error
            }
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

                data = {
                    code: 200,
                    msg: records
                }

                
        } catch (error) {
            data = {
                code: 500,
                msg: error
            }
        }

    }else {

        data = {
            code: 502,
            msg: "502 Bad Gateway"
        }

    }


    return data
}