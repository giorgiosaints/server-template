const morgan = require('morgan')
const logger = require('../tools/logger.config')

module.exports = (app) => {
    app.use(morgan('combined', { stream: logger.stream }))
}