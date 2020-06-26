const express = require('express')
const Route = express.Router()
const indexController = require('../controllers/indexController')

const routes = () => {

    Route.put('/users/:id', indexController.update)
    Route.post('/users', indexController.store)
    Route.get('/users', indexController.show)


    return Route

}

module.exports = routes