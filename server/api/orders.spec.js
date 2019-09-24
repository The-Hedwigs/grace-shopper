const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = require('../db/models/order')
const Tomatoes = require('../db/models/tomatoes')
const Tomorder = require('../db/models/tomorder')
describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('GET /api/orders/', () => {
    beforeEach(() => {
      const order1 = Order.create({
        id: 1000
      })
      const order2 = Order.create({
        id: 1001
      })
      return [order1, order2]
    })
    it('Serves the orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(2)
      expect(res.body[0].id).to.equal(1000)
    })
  })

  describe('GET /api/orders/current/', () => {
    beforeEach(() => {
      let tomato
      const currentOrder = Order.create({
        id: 5000,
        tomatoes: [{tomato}]
      })
      return currentOrder
    })
    it('grabs current order', async () => {
      const res = await request(app)
        .get('/api/orders/current/')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.id).to.equal(5000)
    })
  })
})

// hard time testing this one as we'd need to snag req.session.orderId for the test
// describe('/api/orders/current', () => {
//     it('gets an order with a specified id', async () => {
//       const res = await request(app)
//         .get('/api/orders/current')
//         .expect(200)
//       expect(res.body).to.be.an('object')
//     })
//   })
// })
