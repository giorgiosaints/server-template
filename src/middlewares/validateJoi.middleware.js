module.exports = (validator) => {
	return (req, res, next) => {
		const { error } = validator(req.body)
		if (error) {
			const messages = error.details.map(details => details.message)
			return res.status(400).send(messages)
		}
		next()
	}
}
