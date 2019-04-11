const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024
  },
  active: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    lowercase: true,
    default: 'user',
    trim: true
  },
  // company: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Company',
  //   required: true
  // },
  created_at: {
    type: Date,
    default: Date.now

  },
  update_at: {
    type: Date,
    default: Date.now
  }
})

const validateUser = (user) => {
  const schema = Joi.object().keys({
    full_name: Joi.string().min(5).max(255),
    email: Joi.string().min(5).max(255).required()
      .regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      .error(() => "Invalid email format."),
    password: Joi.string().min(4).max(1024).required(),
    role: Joi.string().valid(['admin', 'user']),
    // company: Joi.objectId()
  })

  return Joi.validate(user, schema, { abortEarly: false })
}

const passwordEncrypt = async (obj, next) => {
  try {
    const salt = await bcrypt.genSalt(config.get('security.saltRounds'))
    const hashed_password = await bcrypt.hash(obj.password, salt)
    obj.password = hashed_password
    next()
  } catch (error) {
    next()
  }
}

// MIDDLEWARES
const encryptPasswordMiddleware = function (next) {
  const user = this
  if (!user.isModified('password')) {
    next()
  } else {
    passwordEncrypt(user, next)
  }
}

const updateEncryptPasswordMiddleware = function (next) {
  const user = this
  if (!user.getUpdate().password) {
    next()
  } else {
    passwordEncrypt(user.getUpdate(), next)
  }
}

const updateUpdatedAtMiddleware = function (next) {
  let update = this.getUpdate()
  update.update_at = new Date()
  next()
}

userSchema.statics.findByEmail = function (email, projection = '') {
  return this.findOne({ email }, projection)
}

userSchema.methods.generateUserToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, config.get('security.jwtPrivateKey'), { expiresIn: config.get('security.tokenLife') })
  return `Bearer ${token}`
}
// userSchema.methods.generateUserRefreshToken = function () {
//     const token = jwt.sign({ _id: this._id, role: this.role }, config.get('security.jwtPrivateKey'), { expiresIn: config.get('security.refreshTokenLife') })
//     return `Bearer ${token}`
// }

userSchema.methods.passwordMatches = function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre('save', encryptPasswordMiddleware)
userSchema.pre('update', updateEncryptPasswordMiddleware)
userSchema.pre('update', updateUpdatedAtMiddleware)
userSchema.pre('findOneAndUpdate', updateEncryptPasswordMiddleware)
userSchema.pre('findOneAndUpdate', updateUpdatedAtMiddleware)

const User = mongoose.model('User', userSchema)

exports.User = User
exports.userSchema = userSchema
exports.validateUser = validateUser