const Project = require('../models/Project')

module.exports = {
  getAllProject: async () => await Project.find({}),
  addProject: async (info, thumbnail, admin) => {
    const project = await Project.findOne({ name: info.name })
    if (project) return { message: 'This service is already exist' }
    const newProject = new Project({
      ...info,
      thumbnail: thumbnail.filename,
      admin,
    })
    try {
      return await newProject.save()
    } catch (err) {
      return err
    }
  },
  deleteProject: async (id) => await Project.findByIdAndDelete(id),
}
