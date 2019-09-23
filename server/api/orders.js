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
    let userId
    const tomato = await Tomatoes.findbyPk(req.body.id)
    let currentOrder = await Order.findOne({
      where: {
        id: req.session.orderId
      },
      include: [{model: Tomatoes}]
    })

    //check to see if a user is logged in:
    if (req.session.passport) {
      userId = req.session.passport.user
    }

    //if there isn't an order in our session, then create a new order
    //else, get the currentOrder
    if (!currentOrder) {
      console.log('NO ORDER ID, creating new order')
      currentOrder = await Order.create()
      orderId = currentOrder.id
      req.session.orderId = orderId
      console.log('session:', req.session)
    }
    //if a user is logged in, then add the user id to that order
    if (userId) {
      await currentOrder.update({userId: userId})
    }

    // check to see if the order-tomato pairing already exists in our database
    let order = await TomOrder.findOne({
      where: {
        orderId: orderId,
        tomatoId: req.body.id
      }
    })

    //if the pairing doesn't exist, create it
    //otherwise, increase the quantity by 1
    if (!order) {
      order = await currentOrder.addTomato(tomato, {through: {quantity: 1}})
    } else {
      let oldQuant = order.quantity
      await order.update({quantity: oldQuant + 1})
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// router.post('/', async (req, res, next) => {
//   // Because we've added an orderId to session if the user is logged in and has an unsubmitted order, we want to check the order table to see if there is a matching order already. If there is no orderId on sessions, we will create a new order. If there is a signed in user, the new order will assign the userid on session to the new order. Regardless of if this is a new order or an existing order, we will then add the new tomato/order pairing to the tomorder table
//   try {
//     const tomato = await Tomatoes.findByPk(req.body.id)
//     let orderId = req.session.orderId
//     let userId

//     //check to see if a user is logged in:
//     if (req.session.passport) {
//       userId = req.session.passport.user
//     }

//     let currentOrder = await Order.findByPk(orderId)

//     //if there isn't an order in our session, then create a new order
//     //else, get the currentOrder
//     if (!currentOrder) {
//       console.log('NO ORDER ID, creating new order')
//       currentOrder = await Order.create()
//       orderId = currentOrder.id
//       req.session.orderId = orderId
//       console.log('session:', req.session)
//     }
//     //if a user is logged in, then add the user id to that order
//     if (userId) {
//       await currentOrder.update({userId: userId})
//     }

//     // check to see if the order-tomato pairing already exists in our database
//     let order = await TomOrder.findOne({
//       where: {
//         orderId: orderId,
//         tomatoId: req.body.id
//       }
//     })

//     //if the pairing doesn't exist, create it
//     //otherwise, increase the quantity by 1
//     if (!order) {
//       order = await currentOrder.addTomato(tomato, {through: {quantity: 1}})
//     } else {
//       let oldQuant = order.quantity
//       await order.update({quantity: oldQuant + 1})
//     }
//     res.json(order)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
