/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      // it('shows all users for logged in admin users', async () => {

      // });
      // it('redirects the user to login page for un-logged in users', async () => {

      // });
      it('redirects the user to home page for logged in users', async () => {
        const res = await request(app)
          .get('/api/users')
          .expect(302)
        expect(res.body).to.be.an('array')
        expect(res.body[0].email).to.be.equal(codysEmail)
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
