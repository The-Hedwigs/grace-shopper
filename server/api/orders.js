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

//router for current cart depending on if it exists. if nothing is inside, return 404 (TODO!!!!)
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

router.post('/current', async (req, res, next) => {
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

    let cost = Number(currentOrder.total) - Number(tomato.price)
    currentOrder.update({total: cost})

    res.json(currentOrder)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  // Because we've added an orderId to session if the user is logged in and has an unsubmitted order, we want to check the order table to see if there is a matching order already. If there is no orderId on sessions, we will create a new order. If there is a signed in user, the new order will assign the userid on session to the new order. Regardless of if this is a new order or an existing order, we will then add the new tomato/order pairing to the tomorder table
  try {
    const tomato = await Tomatoes.findByPk(req.body.id)
    let orderId = req.session.orderId
    let userId
    let currentOrder

    //check to see if a user is logged in:
    if (req.session.passport) {
      userId = req.session.passport.user
    }

    //if there isn't an order in our session, then create a new order
    //else, get the currentOrder
    if (!req.session.orderId) {
      // console.log('NO ORDER ID, creating new order')
      currentOrder = await Order.create()
      orderId = currentOrder.id
      req.session.orderId = orderId
      // console.log('session:', req.session)
    } else
      currentOrder = await Order.findOne({
        where: {
          id: req.session.orderId
        },
        include: [{model: Tomatoes}]
      })
    //if a user is logged in, then add the user id to that order
    if (userId) {
      await currentOrder.update({userId: userId})
    }

    // check to see if the order-tomato pairing already exists in our database
    let tomorder = await TomOrder.findOne({
      where: {
        orderId: orderId,
        tomatoId: req.body.id
      }
    })

    //if the pairing doesn't exist, create it
    //otherwise, increase the quantity by 1
    if (!tomorder) {
      tomorder = await currentOrder.addTomato(tomato, {through: {quantity: 1}})
      // currentOrder.update({total: currentOrder.total + tomato.price})

      //if this is the first tomato added, we need to refind currentOrder to get the tomato in so we can add it to the total
      currentOrder = await Order.findOne({
        where: {
          id: req.session.orderId
        },
        include: [{model: Tomatoes}]
      })
    } else {
      let oldQuant = tomorder.quantity
      await tomorder.update({quantity: oldQuant + 1})
    }

    let cost = Number(currentOrder.total) + Number(tomato.price)
    currentOrder.update({total: cost})
    console.log(currentOrder.total)
    // console.log(currentOrder)
    // //assign total to the total?
    // //note: issue with updating int vs decimal
    // let total = 0
    // currentOrder.tomatoes.forEach(item => {
    //   total = total + item.price * item.tomorder.quantity
    // })
    // await currentOrder.update({total: total})

    res.json(tomorder)
  } catch (err) {
    next(err)
  }
})

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

module.exports = router
