const db = require('../db')
const Sequelize = require('sequelize')
const Tomatoes = db.define('tomatoes', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'some image'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Tomatoes
