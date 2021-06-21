const Service = require('../models/Service')
module.exports = {
  getAllServices: async () => await Service.find({}).sort({ createdAt: -1 }),
  addService: async (info, icon) => {
    const service = await Service.findOne({ name: info.name })
    if (service) return { message: 'This service is already exist' }
    const newService = new Service({ ...info, icon: icon.filename })
    try {
      return await newService.save()
    } catch (err) {
      return err
    }
  },
  deleteService: async (id) => await Service.findByIdAndDelete(id),
}
