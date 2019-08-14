const ValidationError = require('./validation.error');
const AuthenticationError = require('./authentication.error');
const AccessDeniedError = require('./accessDenied.error');

module.exports = {
  ValidationError,
  AuthenticationError,
  AccessDeniedError,
}