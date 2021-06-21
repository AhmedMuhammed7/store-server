const router = require('express').Router()
const projectController = require('../controllers/project.controller')
const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/verfyToken')

//get all projects
router.get('/', auth, async (req, res) => {
  const projects = await projectController.getAllProject()
  return res.json(projects)
})
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => cb(null, file.originalname),
})

const upload = multer({ storage })

//add project
router.post('/add', auth, upload.single('thumbnail'), async (req, res) =>
  res.json(await projectController.addProject(req.body, req.file, req.user.id))
)

//delete project
router.delete('/delete', auth, async (req, res) =>
  res.json(await projectController.deleteProject(req.body.id))
)

module.exports = router
