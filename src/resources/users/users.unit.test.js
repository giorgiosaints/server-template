// const mongoose = require('mongoose')
// const config = require('config')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const { User } = require('./users.model')

// describe('User unit test', () => {

//   describe('validate_object_id', () => {
//     it('should validate a object_id if is an invalid _id', () => {
//       const obj_id = 'invalid_id'
//       const result = mongoose.Types.ObjectId.isValid(obj_id)
//       expect(result).toBe(false)
//     })
//     it('should validate a object_id if is a valid _id', () => {
//       const obj_id = mongoose.Types.ObjectId()
//       const result = mongoose.Types.ObjectId.isValid(obj_id)
//       expect(result).toBe(true)
//     })
//   })

//   describe('password_encrypt', () => {
//     it('should return a hash of the password', async () => {
//       const password = '123456'
//       const salt = await bcrypt.genSalt(config.get('security.saltRounds'))
//       const hashed_password = await bcrypt.hash(password, salt)
//       expect(hashed_password).toEqual(expect.stringMatching(/^\$2[aby]?\$[\d]+\$[./A-Za-z0-9]{53}$/))
//     })
//   })

//   describe('generateUserToken()', () => {
//     it('should return a valid JWT', () => {
//       const payload = {
//         _id: new mongoose.Types.ObjectId().toHexString(),
//         role: 'user'
//       }
//       const user = new User(payload)
//       let token = user.generateUserToken()

//       const parts = token.split(' ')
//       if (parts.length === 2 && parts[0] === 'Bearer') {
//         token = parts[1]
//       }
//       const decoded = jwt.verify(token, config.get('security.jwtPrivateKey'))

//       expect(decoded).toMatchObject(payload)
//     })
//   })

//   describe('passwordMatches()', () => {
//     it('should return the password matches', async () => {
//       const salt = await bcrypt.genSalt(config.get('security.saltRounds'))
//       const hashed_password = await bcrypt.hash('12345678', salt)
//       const payload = {
//         _id: new mongoose.Types.ObjectId().toHexString(),
//         full_name: 'Teste Man',
//         email: 'teste@teste.com',
//         password: hashed_password,
//         role: 'user'
//       }

//       const user = new User(payload)
//       const result = await user.passwordMatches('12345678')
//       expect(result).toBe(true)
//     })
//   })

// })