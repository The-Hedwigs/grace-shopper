const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Tomatoes = require('../db/models/tomatoes')

describe('Tomatoes routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/tomatoes/', () => {
    const tomatoName = 'Domates'

    beforeEach(() => {
      return Tomatoes.create({
        name: tomatoName
      })
    })

    it('GET /api/tomatoes', async () => {
      const res = await request(app)
        .get('/api/tomatoes')
        .expect(200)

      expect(res.body).to.be.an('array')
      console.log(res.body)
      expect(res.body[0].name).to.be.equal('Domates')
    })
  })
})
