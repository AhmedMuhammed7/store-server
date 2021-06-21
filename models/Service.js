const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      maxLength: [20, 'This is a too long name'],
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
    },
    description: {
      type: String,
      required: [true, 'Write Something about this service'],
      maxLength: [240, 'Maxlength is 240'],
    },
    admin: String,
  },
  {
    timestamps: true,
  }
)
const Service = mongoose.model('Service', serviceSchema)
module.exports = Service
