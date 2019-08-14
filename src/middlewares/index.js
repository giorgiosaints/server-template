const CommonMiddleware = require('./common.middleware')
const RoutesMiddleware = require('./routes.middleware')
const ErrorHandlingMiddleware = require('./errorHandling.middleware')

module.exports = function Middleware(app) {
  CommonMiddleware(app)
  RoutesMiddleware(app)
  ErrorHandlingMiddleware(app)
}