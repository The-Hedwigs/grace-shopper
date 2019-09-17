const router = require('express').Router()
const Tomatoes = require('../db/models/tomatoes')

router.get('/', async (req, res, next) => {
  try {
    const tomatoes = await Tomatoes.findAll()
    res.json(tomatoes)
  } catch (err) {
    next(err)
  }
})
module.exports = router