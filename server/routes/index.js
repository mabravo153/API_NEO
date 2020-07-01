const express = require('express')
const Route = express.Router()
const indexController = require('../controllers/indexController')

const routes = () => {

    Route.get('/users', indexController.show)
    Route.get('/users/:id', indexController.showUser)
    Route.get('/users/:id/orders', indexController.showOrder)

    Route.post('/users', indexController.store)
    Route.post('/users/:id/orders', indexController.storeOrder)

    Route.put('/users/:id', indexController.update)
    
    Route.delete('/users/:id', indexController.delete)


    return Route

}

module.exports = routes