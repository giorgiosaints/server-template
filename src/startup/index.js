const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const errorHandler = require('../middlewares/errorHandler.middleware')

module.exports = (app) => {
    const corsOptions = {
        origin: "*",
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        preflightContinue: false,
        optionsSuccessStatus: 204
    }

    // Cors Middlewares
    app.use(express.json())
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
    app.use(cors(corsOptions))
    // app.use(fileUpload())

    // API Routes
    require('./routes')(app)

    // Middlewares functions
    app.use(errorHandler)
}