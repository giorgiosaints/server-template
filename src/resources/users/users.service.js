const _ = require('lodash')
const { User } = require('./users.model')

module.exports = class UsersService {
  async findByEmail(email) {
    const user = await User.findByEmail(email)
    return user
  }

  async findAll(email) {
    if (!email) return await User.find().select('-password').populate('company')

    const data = await User.findByEmail(email)
    return data ? [data] : []
  }

  async findOne(id) {
    const user = await User
      .findById(id)
      .select('-password')
      .populate('company')

    return user
  }

  async create(user) {
    const newUser = new User(user)
    await newUser.save()

    return newUser
  }

  async findById(id) {
    const user = await User.findById(id)
    return user
  }

  async update(id, user_edited) {
    const options = { new: true }
    const user = await User.findByIdAndUpdate(id, user_edited, options)

    return user
  }
  
  async delete(id) {
    const options = { new: true }
    const user = await User.findByIdAndUpdate(id, user_edited, options)

    return user
  }

}