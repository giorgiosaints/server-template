const httpStatus = require('http-status-codes')

module.exports = (err, req, res, next) => {
	// TODO: Log the exception
	res
		.status(httpStatus.BAD_REQUEST)
		.json({ error: { statusCode: err.statusCode, message: err.message } })
}