// model for the join table created from our many-many association
const db = require('../db')
const Sequelize = require('sequelize')

const TomOrder = db.define('tomorder', {
  quantity: {
    type: Sequelize.INTEGER
  }
  // total: {
  //   type: Sequelize.INTEGER
  // }
})

module.exports = TomOrder
