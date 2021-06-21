const router = require('express').Router()
const productController = require('../controllers/product.controller')
const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/verfyToken')
//get all products
router.get('/', auth, async (req, res) =>
  res.status(200).json(await productController.getAllProducts())
)

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

//add product
router.post(
  '/add',
  auth,
  upload.fields([{ name: 'images' }]),
  async (req, res) => {
    return res
      .status(200)
      .json(await productController.addProduct(req.body, req.files))
  }
)

//change rate
router.put('/rate', auth, async (req, res) =>
  res.status(200).json(await productController.updateRate(req.body))
)

router.delete('/delete', auth, async (req, res) =>
  res.status(200).json(await productController.deleteProduct(req.body.id))
)

module.exports = router
