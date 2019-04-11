const _ = require('lodash')
const HttpStatus = require('http-status-codes')
const { User } = require('./users.model')
const usersService = require('./users.service')
// let tokenList = []

exports.signIn = async (req, res) => {
  let user = await usersService.findByEmail(req.body.email)
  if (!user) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid email' })

  const valid_password = await user.passwordMatches(req.body.password)
  if (!valid_password) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid password' })

  const token = user.generateUserToken()
  // const refreshToken = user.generateUserRefreshToken()

  const response = { _id: user._id, full_name: user.full_name, email: user.email, role: user.role, company: user.company, accessToken: token }

  // tokenList[refreshToken] = response

  res.send(response)
}

exports.all = async (req, res) => {
  const email = req.query.email ? req.query.email : null
  const users = await usersService.getUsers(email)
  res.json(users)
}

exports.show = async (req, res) => {
  const user = await usersService.getUser(req.params.id)
  if (!user) return res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid user' })

  res.json(user)
}

exports.create = async (req, res) => {
  let user = await usersService.findByEmail(req.body.email)
  if (user) return res.status(HttpStatus.BAD_REQUEST).send({ message: 'User already registered.' })

  user = await usersService.createUser(req.body)

  res.status(HttpStatus.CREATED).json(_.pick(user, ['_id', 'full_name', 'email', 'role', 'company']))
}

exports.update = async (req, res) => {
  let user = await usersService.findById(req.params.id)
  if (!user) return res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid user' })

  user = await usersService.updateUser(req.params.id, req.body)

  res.json(_.pick(user, ['_id', 'full_name', 'email', 'role', 'company']))
}

exports.delete = async (req, res) => {
  const user = await usersService.findById(req.params.id)
  if (!user) res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid user' })

  await user.remove()

  res.json({ message: 'Delete successfully' })
}