const express = require('express')
const config = require('config')
const ora = require('ora')
require('express-async-errors')

const app = express()
const spinner = ora('Startup server...')
const MESSAGE = `Server is running on port ${config.get('server.url')}${config.get('server.port')}`

require('./startup')(app)
// require('./startup/db')()
if (config.get('swagger.enabled')) require('./startup/swagger')(app)
if (config.get('log.enabled')) require('./startup/logger')(app)
// if (config.get('company.enabled')) require('./startup/startup_user')()

const server = app.listen(config.get('server.port'), () => {
    // spinner.color = 'green'
    // spinner.text = MESSAGE
    spinner.start(MESSAGE)
})

module.exports = server