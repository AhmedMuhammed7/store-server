const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxLength: [20, 'It can\'t exceed 20'],
    },
    rates: {
      type: Array,
      value : Number,
      default : []
    },
    TotalRates : {
      type : Number,
      default : 0
    },
    price: {
      type: Number,
      required: [true, 'Price is Requierd'],
    },
    images: {
      type: Array,
      required: [true, 'Should upload images'],
    },
    thumbnail: {
      type: String,
      default: function (v) {
        v = this.images[0]
        return v
      },
    },
    admin: String,
    amount : {
      type : Number,
      default : 1
    }
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
