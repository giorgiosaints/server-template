const ora = require('ora')
const chalk = require('chalk')
const HttpStatus = require('http-status-codes')
const ValidationError = require('../errors').ValidationError
const AuthenticationError = require('../errors').AuthenticationError
const AccessDeniedError = require('../errors').AccessDeniedError

const spinner = ora('')

function errorLogger(err, req, res, next) {
  if (err.message) {
    spinner.fail(chalk.default.red(err.message))
  }
  if (err.message) {
    spinner.fail(chalk.default.red(err.message))
  }

  next(err)
}

function authenticationErrorHandler(err, req, res, next) {
  if (err instanceof AuthenticationError) {
    return res.sendStatus(HttpStatus.UNAUTHORIZED)
  }
  next(err)
}

function validationErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: { statusCode: err.statusCode, message: err.message } })
  }
  next(err)
}

function accessDeniedErrorHandler(err, req, res, next) {
  if (err instanceof AccessDeniedError) {
    return res.sendStatus(HttpStatus.FORBIDDEN)
  }
  next(err)
}

function genericErrorHandler(err, req, res, next) {
  res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  next()
}

module.exports = function ErrorHandlingMiddleware(app) {
  app.use([
    errorLogger,
    authenticationErrorHandler,
    validationErrorHandler,
    accessDeniedErrorHandler,
    genericErrorHandler
  ])
}