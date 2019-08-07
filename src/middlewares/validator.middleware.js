const Joi = require('joi')
const { userValidationSchema, loginValidationSchema } = require('../resources/users/users.model')

let validators = {
	"User": {
		scopes: {
			default: userValidationSchema,
			login: loginValidationSchema
		}
	}
	// "Another": {
	// 	scopes: {
	// 		default: anotherValidationSchema
	// 	}
	// }
}

function scopeExists(validator, scope) {
	return Object.keys(validator.scopes).find(key => key == scope) != undefined
}

function getSchema(model, scope) {
	let validator = validators[model];
	if(!validator) {
		throw new Error("Validator does not exist")
	}
	// First check if the given validator has multiple scopes
	if(validator.scopes) {
		// If the caller has passed a value for 'scope'
		if(scope) {
			if (!scopeExists(validator, scope)) {
				throw new Error(`Scope ${scope} does not exist in ${model} validator`)
			} else {
				return validator.scopes[scope]
			}
		} else {
			return validator.scopes.default
		}
	} else {
		return validator
	}
}

function validate(model, object, scope) {
	return Joi.validate(object, getSchema(model, scope), {
		allowUnknown: true, 
		abortEarly: false
	})
}

// Actual middleware factory
module.exports = function ValidatorMiddleware(model, scope) {
	return (req, res, next) => {
		const validationResult = validate(model, req.body, scope)
		if (validationResult.error) {
			const messages = validationResult.error.details.map(details => details.message)
			return res.status(400).send(messages)
		}
		next()
	}
}