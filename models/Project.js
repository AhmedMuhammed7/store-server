const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxLength: [20, 'it can\'t exceed 20 chars'],
    },
    slogin: {
      type: String,
      maxLength: [50, 'max length is 50 char'],
      default: 'The model is highly accurate original dimensions.',
    },
    bedroom: Number,
    living_room: Number,
    bath_room: Number,
    kitchen: Number,
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxLength: [100, 'Is too long'],
    },

    admin: String,
    thumbnail: String,
  },
  {
    timestapms: true,
  }
)

const Project = mongoose.model('project', projectSchema)

module.exports = Project
