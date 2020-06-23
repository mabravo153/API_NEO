const express = require('express')
const Route = express.Router()
const indexController = require('../controllers/indexController')

const routes = () => {

    Route.post('/prueba', indexController.store)


    return Route

}

module.exports = routes