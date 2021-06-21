const router = require('express').Router()
const userController = require('../controllers/user.controller')
const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/verfyToken')

//get all user
router.get('/', auth, async (req, res) => {
  return res.status(200).json(await userController.getAllUsers())
})

//get specific user
router.get('/user/:id', auth, async (req, res) => {
  const result = await userController.getUser(req.params.id)
  result.type ? res.status(200).json(result) : res.status(404).json(result)
})



router.get('/token', auth, (req, res) => {
  res.json({ type: true, body: 'Token is Valid' })
})

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => cb(null, file.originalname),
})

const upload = multer({ storage })
//register
router.post('/register', upload.single('avatar'), async (req, res) => {
  const result = await userController.addUser(req.body, req.file)
  result.type ? res.status(201).json(result) : res.status(400).json(result)
})

//login
router.post('/login', async (req, res) => {
  const result = await userController.login(req.body)
  return result.type
    ? res.status(200).json(result)
    : res.status(401).json(result)
})

//message
router.put('/messages/add', auth, async (req, res) => {
  const result = await userController.addMessage(req.body)
  result.type ? res.status(200).json(result) : res.status(400).json(result)
})

//Active and DeActive
router.put('/activation', auth, async (req, res) =>
  res.json(await userController.userActivation(req.body))
)

//Administraion
router.put('/administraion', auth, async (req, res) =>
  res.json(await userController.userAdministraion(req.body))
)

//delete user
router.delete('/delete', auth, async (req, res) => {
  return res.json(await userController.deleteUser(req.body.id))
})

module.exports = router
