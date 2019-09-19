const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  //inform if order is in cart or submitted
  submitted: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  },
  total: {
    type: Sequelize.DECIMAL(100, 2)
  },
  shipping: {
    type: Sequelize.TEXT
  },
  billing: {
    type: Sequelize.TEXT
  },
  payment: {
    type: Sequelize.ENUM('Cash', 'Credit', 'Paypal')
  },
  email: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order

//hooks
