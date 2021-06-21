const router = require('express').Router()
const serviceController = require('../controllers/service.controller')
const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/verfyToken')
router.get('/', auth, async (req, res) =>
  res.status(200).json(await serviceController.getAllServices())
)

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })
router.post('/add', auth, upload.single('icon'), async (req, res) => {
  res.status(200).json(await serviceController.addService(req.body, req.file))
})

router.delete('/delete', auth, async (req, res) => {
  res.status(200).json(await serviceController.deleteService(req.body.id))
})
module.exports = router
