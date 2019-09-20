const router = require('express').Router()
const Order = require('../db/models/order')
const TomOrder = require('../db/models/tomorder')
const Tomatoes = require('../db/models/tomatoes')

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      include: [
        {
          model: Tomatoes,
          through: {attributes: ['userId, orderId', 'id', 'quantity']}
        }
      ]
    })
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await TomOrder.findAll({
      where: {
        orderId: req.params.orderId
      },
      include: [{model: Tomatoes}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  // Because we've added an orderId to session if the user is logged in and has an unsubmitted order, we want to check the order table to see if there is a matching order already. If there is no orderId on sessions, we will create a new order. If there is a signed in user, the new order will assign the userid on session to the new order. Regardless of if this is a new order or an existing order, we will then add the new tomato/order pairing to the tomorder table
  try {
    console.log(req.body.id)
    let orderId = req.session.orderId
    let userId = req.session.userId
    if (!orderId) {
      let newOrder = await Order.create()
      orderId = newOrder.id
      req.session.orderId = orderId
      if (userId) {
        await newOrder.update({userId: userId})
      }
    }
    // place this order into the tomorder table, if the tomato order pairing already exists, increment quantity, otherwise, it's 1 tomato
    let order = await TomOrder.findOne({
      where: {
        orderId: orderId,
        tomatoId: req.body.id
      }
    })
    if (!order) {
      order = await TomOrder.create({
        orderId: orderId,
        tomatoId: req.body.id,
        quantity: 1
      })
    } else {
      let oldQuant = order.quantity
      await order.update({quantity: oldQuant + 1})
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
