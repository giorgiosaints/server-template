const CommonMiddleware = require('./common.middleware')

module.exports = function Middleware(app) {
  CommonMiddleware(app)
}