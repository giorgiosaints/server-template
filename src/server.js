const express = require('express')
// const logger = require('./config/winston.config')
const config = require('config')
const ora = require('ora')
require('express-async-errors')

const app = express()
const spinner = ora('Startup server...')

require('./startup/startup')(app)

// if (config.get('log.enabled')) require('./startup/logger')(app)
// if (config.get('swagger.enabled')) require('./startup/swagger')(app)
// require('./startup/db')()
// if (config.get('company.enabled')) require('./startup/startup_user')()

const server = app.listen(config.get('server.port'), () => {
    spinner.color = 'green'
    spinner.text = `Server is running on port ${config.get('server.url')}${config.get('server.port')}`
    spinner.start();
    // logger.info(`Server is running on port: ${config.get('server.port')}`)
})

module.exports = server