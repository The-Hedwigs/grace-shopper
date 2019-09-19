const router = require('express').Router()
const Order = require('../db/models/order')
const Tomorder = require('../db/models/tomorder')
const Tomatoes = require('../db/models/order')

router.post('/', async (req, res, next) => {
  // Because we've added an orderId to session if the user is logged in and has an unsubmitted order, we want to check the order table to see if there is a matching order already. If there is no orderId on sessions, we will create a new order. If there is a signed in user, the new order will assign the userid on session to the new order. Regardless of if this is a new order or an existing order, we will then add the new tomato/order pairing to the tomorder table
  try {
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
    // place this order into the tomorder table, if the tomato order pairing already exists, increment it, otherwise, it's 1 tomato
    let order = await Tomorder.findOne({
      where: {
        orderId: orderId,
        tomatoId: req.body.id
      }
    })
    if (!order) {
      order = await Tomorder.create({
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

router.put('/:id', async (req, res, next) => {
  //check to see if entry exists. if it does, just update that table
  //if entry does not exist, then addTomato
  try {
    const id = Number(req.params.id)
    const order = await Order.findById(id)
    const newTomato = await Tomatoes.findById(/* this will take in the tomato id thats submitted when we click on the add button */)
    const tomatoPrice = newTomato.price
    await order.addTomato(newTomato, {quantity: 1})
    await order.update({
      total: order.total + tomatoPrice
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
module.exports = router
