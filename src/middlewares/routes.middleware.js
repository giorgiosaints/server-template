const users = require('../resources/users/users.routing')

module.exports = function RoutesMiddleware(app) {
  app.get('/', (req, res) => res.redirect('/api-docs'))

  app.use('/api/users', users)
}