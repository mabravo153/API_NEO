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

            const records = query.records


            data = {
                code: 200,
                msg: records
            }

        } catch (error) {
            data = {
                code: 503,
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