const express = require('express')
const dotenv = require('dotenv')
const config = require('config')
const ora = require('ora')
const Middlewares = require('./middlewares')
const Swagger = require('./startup/swagger')
const Database = require('./startup/database')
require('express-async-errors')

dotenv.config()
const app = express()
const spinner = ora('Startup server...')
const MESSAGE = `Server is running on port ${config.get('server.url')}${config.get('server.port')}`


Middlewares(app)
Database()
if (config.get('swagger.enabled')) Swagger(app)

const server = app.listen(config.get('server.port'), () => {
	spinner.start(MESSAGE)
})

module.exports = server