const HttpStatus = require('http-status-codes')
// const winston = require('winston')

module.exports = (err, req, res, next) => {
    // TODO: Log the exception
    // winston.error(err.message, err)
		res
			.status(HttpStatus.BAD_REQUEST)
			.json({ error: { statusCode: err.statusCode, message: err.message } })
}