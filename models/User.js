const mongoose = require('mongoose')
const userSechma = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First Name is required'],
      minLength: [2, 'Is too small'],
      maxLength: [40, 'Is too large'],
    },
    last_name: {
      type: String,
      required: [true, 'Last Name is required'],
      minLength: [2, 'Is too small'],
      maxLength: [40, 'Is too large'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      minLength: [10, 'Is too small'],
      maxLength: [200, 'Is too large'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password is very Week'],
      maxLength: 1024,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
    },
    avatar: {
      type: String,
      default: function (v) {
        v = this.gender === 'Male' ? 'man.svg' : 'woman.svg'
        return v
      },
    },
    messages: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)
const User = mongoose.model('User', userSechma)

module.exports = User
