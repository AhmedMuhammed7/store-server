const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
  product : Object,
  amount : {
    type : Number,
    default : 1
  }
  ,
  userId : String
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart