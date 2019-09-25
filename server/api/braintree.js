const router = require('express').Router()
const braintree = require('braintree')
module.exports = router

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
})

router.get('/', (req, res, next) => {
  try {
    res.send('braintree routes healthy!')
  } catch (err) {
    next(err)
  }
})

router.get('/v1/getToken', async (req, res, next) => {
  try {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(response)
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/v1/sandbox', async (req, res, next) => {
  try {
    const clientNonce = req.body.paymentMethodNonce
    const newTransaction = gateway.transaction.sale(
      {
        amount: '100.00',
        paymentMethodNonce: clientNonce,
        options: {
          submitForSettlement: true
        }
      },
      function(err, result) {
        if (result) {
          res.send(result)
        } else {
          res.status(500).send(err)
        }
      }
    )
  } catch (err) {
    next(err)
  }
})
