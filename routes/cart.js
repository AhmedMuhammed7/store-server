const router = require('express').Router()
const cartController = require('../controllers/cart.controller')
const auth = require('../middlewares/verfyToken')
//get all proucts in cart for a specific user
router.get('/:id', auth, async (req, res) =>
  res.status(200).json(await cartController.getAll(req.params.id))
)

//add to cart
router.post('/add-to', auth, async (req, res) => {
  const cart = await cartController.getOne(req.body.product)
  return res
    .status(200)
    .json(
      cart
        ? await cartController.updateAmount({ type: 'up', id: cart._id })
        : await cartController.addToCart(req.body)
    )
})

//update amount
router.put('/amount', auth, async (req, res) => {
  return res.status(200).json(await cartController.updateAmount(req.body))
})

//delete
router.delete('/delete/:id', auth, async (req, res) => {
  const result = await cartController.deleteFromCart(req.params.id)
  return res
    .status(result.type ? 200 : 404)
    .json(await cartController.deleteFromCart(req.body.id))
})

module.exports = router
