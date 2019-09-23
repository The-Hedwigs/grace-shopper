const router = require('express').Router()
const Tomatoes = require('../db/models/tomatoes')

router.get('/', async (req, res, next) => {
  try {
    const tomatoes = await Tomatoes.findAll()
    console.log('tomatoes router: req.session', req.session)
    res.json(tomatoes)
  } catch (err) {
    next(err)
  }
})

router.get('/:tomatoId', async (req, res, next) => {
  try {
    const tomato = await Tomatoes.findOne({
      where: {
        id: req.params.tomatoId
      }
    })
    res.json(tomato)
  } catch (err) {
    next(err)
  }
})

module.exports = router
