const _ = require('lodash')
const HttpStatus = require('http-status-codes')
// const errorHandler = require('../../tools/errorHandler.js')
const UsersService = require('./users.service')

const usersService = new UsersService()

// let tokenList = []
exports.signIn = async (req, res) => {
  let user = await usersService
    .findByEmail(req.body.email)
    .catch(error => new Error(error))

  if (!user) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid email' })

  const valid_password = await user.passwordMatches(req.body.password)
  if (!valid_password) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid password' })

  const token = user.generateUserToken()
  // const refreshToken = user.generateUserRefreshToken()

  const response = { _id: user._id, full_name: user.full_name, email: user.email, role: user.role, company: user.company, accessToken: token }

  // tokenList[refreshToken] = response

  res.send(response)
}

exports.findAll = async (req, res) => {
  const email = req.query.email ? req.query.email : null
  const users = await usersService
    .findAll(email)
    .catch(error => new Error(error))

  res.json(users)
}

exports.findOne = async (req, res) => {
  const user = await usersService
    .findOne(req.params.id)
    .catch(error => new Error(error))

  if (!user) return res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid user' })

  res.json(user)
}

exports.create = async (req, res) => {
  let user = await usersService
    .findByEmail(req.body.email)
    .catch(error => new Error(error))

  if (user) return res
    .status(HttpStatus.BAD_REQUEST)
    .send({ message: 'User already registered.' })

  user = await usersService
    .create(req.body)
    .catch(error => new Error(error))

  res.status(HttpStatus.CREATED).json(_.pick(user, ['_id', 'full_name', 'email', 'role', 'company']))
}

exports.update = async (req, res) => {
  let user = await usersService
    .findById(req.params.id)
    .catch(error => new Error(error))

  if (!user) return res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid user' })

  user = await usersService
    .update(req.params.id, req.body)
    .catch(error => new Error(error))

  res.json(_.pick(user, ['_id', 'full_name', 'email', 'role', 'company']))
}

exports.delete = async (req, res) => {
  const user = await usersService
    .findById(req.params.id)
    .catch(error => new Error(error))

  if (!user) res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid user' })

  await user.remove()

  res.json({ message: 'Delete successfully' })
}