const mongoose = require('mongoose')
const HttpStatus = require('http-status-codes')

module.exports = (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(HttpStatus.NOT_FOUND).send('Invalid id')

	next()
}