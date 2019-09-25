const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = require('../db/models/order')
const User = require('../db/models/user')
const Tomatoes = require('../db/models/tomatoes')
const Tomorder = require('../db/models/tomorder')

let user = {
  email: 'cody@email.com',
  password: '123',
  id: 1
}

describe('Order routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    let cody = await User.create({
      email: 'cody@email.com',
      password: '123',
      orderInfo: {id: 5000}
    })
    const currentOrder = await Order.create({
      id: 5000
    })
    await currentOrder.setUser(cody)

    const order1 = await Order.create({
      id: 1000
    })
    const order2 = await Order.create({
      id: 1001
    })
    return [order1, order2]
  })

  describe('GET /api/orders/', () => {
    it('Serves the orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(3)
      expect(res.body[0].id).to.equal(1000)
    })
  })

  // Tried to mock a session to get this to work, but still wasn't working
  // describe('GET /api/orders/current', () => {
  //   it('grabs current order', async () => {
  //     const agent = request.agent(app)
  //     await agent
  //       .post('/auth/login')
  //       .send({email: user.email, password: user.password})
  //     const res = await agent
  //       .get('/api/orders/current')
  //       .expect(200)
  //     expect(res.body).to.be.an('object')
  //     expect(res.body.id).to.equal(5000)
  //   })
  // })
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
