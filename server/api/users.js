const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function requireAdminStatus(req, res, callback) {
  if (req.user.isAdmin) {
    callback()
  } else {
    res.redirect('/home')
  }
}

router.get('/', async (req, res, next) => {
  requireAdminStatus(req, res, async () => {
    try {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  })
})

router.get('/:id', (req, res, next) => {
  //console.log("getting user with id");
  //console.log(req.user);
  requireAdminStatus(req, res, async () => {
    //I created a function checks that user`s admin situation, acoordingly returns the data or redirects unauthorized.
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'email', 'shippingAddress', 'billingAddress']
      })
      res.json(user)
    } catch (err) {
      next(err)
    }
  })
})

router.put('/:id', async (req, res, next) => {
  try {
    const [numberOfUsers, whichUsers] = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(whichUsers[0])
  } catch (err) {
    next(err)
  }
})
