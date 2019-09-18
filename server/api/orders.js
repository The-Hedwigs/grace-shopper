const router = require('express').Router()
const Order = require('../db/models/order')
const Tomatoes = require('../db/models/order')

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({})
    res.json(newOrder)
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
