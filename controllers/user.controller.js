const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
  getAllUsers: async () =>
    await User.find({}).select({
      first_name: 1,
      last_name: 1,
      email: 1,
      gender: 1,
      avatar: 1,
      admin: 1,
      messages: 1,
      isActive: 1,
    }),
  getUser: async (id) => {
    try {
      const user = await User.findOne({ _id: id })
      if (!user) return { type: false, body: 'user id is invalid' }
      return {
        type: true,
        body: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          isActive: user.isActive,
          admin: user.admin,
          avatar: user.avatar,
          messages: user.messages,
          gender: user.gender,
          id: user._id,
        },
      }
    } catch (err) {
      return { type: false }
    }
  },
  addUser: async (userData, avatar) => {
    const { email, password } = userData
    const salt = await bcrypt.genSalt(10)
    let savedPassword =
      password === '' || password.length < 8
        ? password
        : await bcrypt.hash(password, salt)

    const newUser = new User({
      ...userData,
      password: savedPassword,
      avatar: avatar.filename,
    })
    const user = await User.findOne({ email })
    if (user) return { type: false, body: 'This email is already exist' }
    try {
      await newUser.save()
      return {
        type: true,
        body: 'User added successfully',
      }
    } catch (err) {
      return { type: false, body: err.errors }
    }
  },
  login: async (data) => {
    const { email, password } = data
    if (!email) {
      return { type: false, body: 'Enter Your Email' }
    }
    const user = await User.findOne({ email })
    if (!user) return { type: false, body: 'Email is\'nt exit' }

    if (!password) {
      return { type: false, body: 'Enter Your password' }
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return { type: false, body: 'Password is wrong' }
    const token = jwt.sign(
      {
        id: user._id,
        iat: Date.now(),
      },
      process.env.TOKEN_SECRET,
      { expiresIn: '7 days' }
    )
    return { type: true, body: { token, customId: user.customId } }
  },
  addMessage: async (user) => {
    const { id, message } = user
    if (message.body === '') return { type: false, body: 'Write Somthing' }
    try {
      await User.updateOne(
        { _id: id },
        {
          $push: {
            messages: {
              subject: message.subject,
              body: message.body,
            },
          },
        }
      )
      return { type: true, body: 'Message was added' }
    } catch (err) {
      return { type: false, body: 'Something went wrong' }
    }
  },
  userActivation: async (info) => {
    const { type, id } = info
    return type === 'Active'
      ? await User.findOneAndUpdate(
        { customId: id },
        { isActive: true },
        { new: true }
      )
      : await User.findOneAndUpdate(
        { customId: id },
        { isActive: false },
        { new: true }
      )
  },
  userAdministraion: async (info) => {
    const { type, id } = info
    return type === 'make'
      ? await User.findOneAndUpdate(
        { customId: id },
        { admin: true },
        { new: true }
      )
      : await User.findOneAndUpdate(
        { customId: id },
        { admin: false },
        { new: true }
      )
  },
  deleteUser: async (id) => await User.deleteOne({ customId: id }),
}
