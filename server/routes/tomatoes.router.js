const router = require('express').Router()
const Tomatoes = require('../db/models/tomatoes')
const Sequelize = require('sequelize')
router.get('/', async (req, res, next) => {
  const tomatoes = await Tomatoes.findAll()
  res.status(200).send(tomatoes)
})

module.exports = router
