const db = require('../db')
const Sequelize = require('sequelize')

const Tomatoes = db.define('tomatoes', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://d2v48i7nl75u94.cloudfront.net/uploads/b2cb59efe82efb2bfeb2908b91c54d78.jpeg'
  },
  price: {
    type: Sequelize.DECIMAL(100, 2),
    defaultValue: 0.0
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Tomatoes
