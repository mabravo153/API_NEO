const neo = require('neo4j-driver');

const connect = async () => {
    const driver = neo.driver('bolt://localhost:7687', neo.auth.basic('mabravo153', 'Barranquilla1.')); 
    try{
        await driver.verifyConnectivity({
            database: 'proyectoneo'
        })
        return driver; 
    }catch (error){
        console.error(error);
    }

} 


module.exports = connect 
