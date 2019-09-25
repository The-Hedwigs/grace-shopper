const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const TomOrder = require('../db/models/tomorder')
const Tomatoes = require('../db/models/tomatoes')

//function allows only admin users to view api pages
function requireAdminStatus(req, res, callback) {
  if (req.user && req.user.isAdmin) {
    callback()
  } else {
    res.redirect('/home')
  }
}

//find all orders in database
router.get('/', async (req, res, next) => {
  requireAdminStatus(req, res, async () => {
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
})

//current cart depending on if it exists. if nothing is inside, return null
router.get('/current', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.session.orderId
      },
      include: [{model: Tomatoes}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//creates an order based on whether or not one exists that matches the order ID
router.post('/current', async (req, res, next) => {
  try {
    let currentOrder
    //creates an order based off of the order id in the session
    if (!req.session.orderId) {
      currentOrder = await Order.create()
      req.session.orderId = currentOrder.id
    } else {
      currentOrder = await Order.findOrCreate({
        where: {
          id: req.session.orderId
        },
        include: [{model: Tomatoes}]
      })
    }
    //sends the order back to thunk
    res.json(currentOrder)
  } catch (error) {
    next(error)
  }
})

//updates items in cart
router.put('/current', async (req, res, next) => {
  try {
    const tomato = await Tomatoes.findByPk(req.body.id)

    let currentOrder = await Order.findOne({
      where: {
        id: req.session.orderId
      },
      include: [{model: Tomatoes}]
    })

    // check to see if the order-tomato pairing already exists in our database
    let tomorder = await TomOrder.findOne({
      where: {
        orderId: req.session.orderId,
        tomatoId: req.body.id
      }
    })

    //if it doesn't exist, then add the pairing to the database
    if (!tomorder) {
      tomorder = await currentOrder.addTomato(tomato, {through: {quantity: 1}})

      //if this is the first tomato added, we need to update currentOrder to get the tomato in so we can add it to the total
      currentOrder = await Order.findOne({
        where: {
          id: req.session.orderId
        },
        include: [{model: Tomatoes}]
      })
    } else {
      //otherwise, add 1 to the quantity
      let oldQuant = tomorder.quantity
      await tomorder.update({quantity: oldQuant + 1})
    }
    //update total cost to reflect the change
    let cost = Number(currentOrder.total) + Number(tomato.price)
    currentOrder.update({total: cost})

    res.json(currentOrder)
  } catch (error) {
    next(error)
  }
})

//pulls in current cart information
router.get('/current/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.session.orderId
      },
      include: [{model: Tomatoes}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//removes item from cart
router.put('/current/cart', async (req, res, next) => {
  try {
    const tomato = await Tomatoes.findByPk(req.body.id)
    const tomorder = await TomOrder.findOne({
      where: {
        tomatoId: req.body.id
      },
      include: [
        {
          model: Tomatoes
        }
      ]
    })
    //checks to see if there's more than one of this item in the cart. if there isn't then delete the item
    let oldQuant = tomorder.quantity
    if (oldQuant > 1) {
      await tomorder.update({quantity: oldQuant - 1})
    } else {
      await tomorder.destroy()
    }

    const currentOrder = await Order.findOne({
      where: {
        id: req.session.orderId
      },
      include: [{model: Tomatoes}]
    })

    //update cost accordingly
    let cost = Number(currentOrder.total) - Number(tomato.price)
    currentOrder.update({total: cost})

    res.json(currentOrder)
  } catch (error) {
    next(error)
  }
})

//checkout route
router.put('/checkout', async (req, res, next) => {
  try {
    const [numberOfOrders, whichOrders] = await Order.update(req.body, {
      where: {
        id: req.session.orderId
      },
      returning: true
    })
    res.json(whichOrders[0])
  } catch (err) {
    next(err)
  }
})

//clear cart route
router.delete('/current', async (req, res, next) => {
  try {
    req.session.orderId = null
    res.send('order has been reset')
  } catch (err) {
    next(err)
  }
})

module.exports = router
