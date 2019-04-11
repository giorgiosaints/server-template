const request = require('supertest')
const { User } = require('./users.model')
const _ = require('lodash')

describe('api/users', () => {
  let server
  let newCompany
  let token
  let newUser
  let userBody
  beforeEach(async () => {
    server = require('../../server')

    userBody = {
      full_name: 'Teste Man',
      email: "serginho@gmail.com",
      password: "qwerty123",
      role: 'admin',
    }

    newUser = new User(userBody)
    await newUser.save()
    token = newUser.generateUserToken()
  })
  afterEach(async () => {
    await server.close()
    await User.deleteMany({})
  })

  // describe('AUTH MIDDLEWARE', () => {

  //   describe('Validate token by GET method without id', () => {
  //     const exec = () => {
  //       return request(server)
  //         .get('/api/users')
  //         .set('Authorization', token)
  //     }

  //     it('should return 401 if no token is provided', async () => {
  //       token = ''
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //       expect(res.body.message).toBe('Access denied. No token provided.')
  //     })

  //     it('should return 401 if token is invalid', async () => {
  //       token = 'a'
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //       expect(res.body.message).toBe('Invalid token.')
  //     })
  //   })

  //   describe('Validate token by GET method with id', () => {
  //     it('should return 401 if no token is provided', async () => {
  //       token = ''
  //       const exec = () => {
  //         return request(server)
  //           .get(`/api/users/${newUser._id}`)
  //           .set('Authorization', token)
  //       }
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //       expect(res.body.message).toBe('Access denied. No token provided.')
  //     })

  //     it('should return 401 if token is invalid', async () => {
  //       token = 'a'
  //       const exec = () => {
  //         return request(server)
  //           .get(`/api/users/${newUser._id}`)
  //           .set('Authorization', token)
  //       }
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //       expect(res.body.message).toBe('Invalid token.')
  //     })

  //   })

  //   describe('Validate token by POST method', () => {
  //     const exec = () => {
  //       return request(server)
  //         .post('/api/users')
  //         .set('Authorization', token)
  //         .send(newUser)
  //     }

  //     it('should return 401 if no token is provided', async () => {
  //       token = ''
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //     })

  //     it('should return 400 if token is invalid', async () => {
  //       token = 'a'
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //     })

  //   })

  //   describe('Validate token by PATCH method', () => {
  //     const exec = () => {
  //       return request(server)
  //         .patch(`/api/users/${newUser._id}`)
  //         .set('Authorization', token)
  //         .send({ full_name: 'teste' })
  //     }
  //     it('should return 401 if no token is provided', async () => {
  //       token = ''
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //     })

  //     it('should return 401 if token is invalid', async () => {
  //       token = 'a'
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //     })
  //   })

  //   describe('Validate token by DELETE method', () => {
  //     const exec = () => {
  //       return request(server)
  //         .delete(`/api/users/${newUser._id}`)
  //         .set('Authorization', token)
  //     }
  //     it('should return 401 if no token is provided', async () => {
  //       token = ''
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //     })

  //     it('should return 401 if token is invalid', async () => {
  //       token = 'a'
  //       const res = await exec()
  //       expect(res.status).toBe(401)
  //     })
  //   })
  // })

  // describe('AUTHZ MIDDLEWARE', () => {
  //   describe('Validate authorization by POST', () => {
  //     it('should return 403 if user is not admin by POST', async () => {
  //       const exec = () => {
  //         return request(server)
  //           .post('/api/users')
  //           .set('Authorization', tokenUser)
  //           .send({ full_name: 'test' })
  //       }
  //       const res = await exec()
  //       expect(res.status).toBe(403)
  //     })
  //   })

  //   describe('Validate authorization by GET', () => {
  //     it('should return 403 if user is not admin by GET', async () => {
  //       const exec = () => {
  //         return request(server)
  //           .get('/api/users')
  //           .set('Authorization', tokenUser)
  //       }
  //       const res = await exec()
  //       expect(res.status).toBe(403)
  //     })

  //     it('should return 403 if user is not admin by GET with id', async () => {
  //       const userUser = {
  //         full_name: 'Teste Man 3',
  //         email: "testet@gmail.com",
  //         password: "qwerty123",
  //         role: 'user',
  //         company: {
  //           _id: company._id,
  //           name: company.name
  //         }
  //       }
  //       const userTest = new User(userUser)
  //       userTest.save()
  //       const exec = () => {
  //         return request(server)
  //           .get(`/api/users/${newUser._id}`)
  //           .set('Authorization', tokenUser)
  //       }
  //       const res = await exec()
  //       expect(res.status).toBe(403)
  //     })
  //   })

  //   describe('Validate authorization by PATCH', () => {
  //     it('should return 403 if user is not admin by PATCH', async () => {
  //       const exec = () => {
  //         return request(server)
  //           .patch(`/api/users/${newUser._id}`)
  //           .set('Authorization', tokenUser)
  //           .send({ full_name: "teste" })
  //       }
  //       const res = await exec()
  //       expect(res.status).toBe(403)
  //     })
  //   })

  //   describe('Validate authorization by DELETE', () => {
  //     it('should return 403 if user is not admin by DELETE', async () => {
  //       const exec = () => {
  //         return request(server)
  //           .delete(`/api/users/${newUser._id}`)
  //           .set('Authorization', tokenUser)
  //       }
  //       const res = await exec()
  //       expect(res.status).toBe(403)
  //     })
  //   })
  // })

  describe('GET: /api/users', () => {
    it('should return all users', async () => {
      await User.collection.insertMany([{
        full_name: "test user 1",
        email: "teste_test@test.com",
        password: "123456",
        role: "admin",
        company: newCompany._id
      },
      {
        full_name: "test user 2",
        email: "teste1_test@test.com",
        password: "123456",
        role: "admin",
        company: newCompany._id
      }])

      const res = await request(server)
        .get('/api/users')
        .set('Authorization', token)

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(3)
    })
  })

  describe('GET: /api/users/:id', () => {
    it('should return a user if valid id is passed', async () => {
      const res = await request(server)
        .get(`/api/users/${newUser._id}`)
        .set('Authorization', token)

      expect(res.status).toBe(200)
    })

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server)
        .get(`/api/users/200`)
        .set('Authorization', token)

      expect(res.status).toBe(404)
    })

  })

  describe('POST: /api/users', () => {

    const exec = () => {
      return request(server)
        .post('/api/users')
        .set('Authorization', token)
        .send(userBody)
    }

    it('should return 201 if user is created successfully', async () => {
      userBody.email = 'test@test.com.br'

      const res = await exec()
      expect(res.status).toBe(201)
    })

    it('should return 400 if create a user already existing', async () => {
      const res = await exec()

      expect(res.status).toBe(400)
      expect(res.body.message).toEqual('User already registered.')
    })

    // it('should return 400 if fields not required is not provied', async () => {
    //   userBody = {}
    //   const res = await exec()

    //   expect(res.status).toBe(201)
    // })

    it('should return 400 if body is empty', async () => {
      userBody = {}
      const res = await exec()
      expect(res.status).toBe(400)
    })
  })

  describe('PATCH: /api/users/:id', () => {

    const exec = () => {
      return request(server)
        .patch(`/api/users/${newUser._id}`)
        .set('Authorization', token)
        .send(userBody)
    }

    it('should return 200 if user is created successfully', async () => {
      userBody.full_name = 'Teste Edited'
      userBody.email = 'emailedited@email.com'

      const res = await exec()

      expect(res.status).toBe(200)
    })

    it('should return 400 if body is empty', async () => {
      userBody = {}

      const res = await exec()
      expect(res.status).toBe(400)
      expect(res.type).toBe('application/json')
    })

    it('should return 404 if invalid id is provied', async () => {
      newUser._id = 'aaa'

      const res = await exec()
      expect(res.status).toBe(404)
    })
  })

  describe('DELETE: /api/users/:id', () => {

    exec = () => {
      return request(server)
        .delete(`/api/users/${newUser._id}`)
        .set('Authorization', token)
    }

    it('should return 200 if deleted with success', async () => {
      const res = await exec()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe('Delete successfully')
    })

    it('should return 400 if deleted type nonexistent', async () => {
      await exec()
      const res = await exec()

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Invalid user')
    })

    it('should return 404 if url invalid is provied', async () => {
      exec = () => {
        return request(server)
          .delete(`/api/usersss/${newUser._id}`)
          .set('Authorization', token)
      }

      const res = await exec()

      expect(res.status).toBe(404)
    })

    it('should return 404 if invalid id is provied', async () => {
      exec = () => {
        return request(server)
          .delete(`/api/users/aa`)
          .set('Authorization', token)
      }

      const res = await exec()

      expect(res.status).toBe(404)
    })

    it('should return 404 if id is not provied', async () => {
      exec = () => {
        return request(server)
          .delete(`/api/users/`)
          .set('Authorization', token)
      }

      const res = await exec()

      expect(res.status).toBe(404)
    })
  })
})