const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const config = require('config')
const logger = require('../tools/logger.config')

module.exports = function CommonMiddleware(app) {
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
	if (config.get('log.enabled')) app.use(morgan('combined', { stream: logger.stream }))
	app.use(cors(corsOptions))
	app.use(helmet())

	// API Routes
	// require('../startup/routes')(app)

	// Middlewares functions
	// app.use(errorMiddleware)
}