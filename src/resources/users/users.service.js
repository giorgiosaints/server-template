const _ = require('lodash')
const { User } = require('./users.model')

exports.findByEmail = async (email) => {
  try {
    const user = await User.findByEmail(email)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

exports.getUsers = async (email) => {
  try {
    if (!email) return await User.find().select('-password').populate('company')

    const data = await User.findByEmail(email)
    return data ? [data] : []
  } catch (error) {
    throw new Error(error)
  }
}

exports.getUser = async (id) => {
  try {
    const user = await User
      .findById(id)
      .select('-password')
      .populate('company')

    return user
  } catch (error) {
    throw new Error(error)
  }
}

exports.createUser = async (user) => {
  try {
    const newUser = new User(user)
    await newUser.save()

    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

exports.findById = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

exports.updateUser = async (id, user_edited) => {
  try {
    const options = { new: true }
    const user = await User.findByIdAndUpdate(id, user_edited, options)

    return user
  } catch (error) {
    throw new Error(error)
  }
}