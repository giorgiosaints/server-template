const HttpStatus = require('http-status-codes')

module.exports = (req, res, next) => {
	if (req.authenticated.role !== 'admin') {
		return res.status(HttpStatus.FORBIDDEN).send('Permission denied.')
	}
	next()
}