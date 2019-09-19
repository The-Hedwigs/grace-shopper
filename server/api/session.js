const router = require('express').Router()

router.get('/', (req, res, next) => {
  try {
    const session = {
      userId: req.session.userId,
      orderId: req.session.orderId
    }
    res.json(session)
  } catch (err) {
    next(err)
  }
})
