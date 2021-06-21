const Product = require('../models/Product')

module.exports = {
  getAllProducts: async () => {
    return await Product.find({}).sort({ createdAt: -1 })
  },
  addProduct: async (productInfo, images) => {
    const { name, admin } = productInfo

    const newProduct = new Product({
      ...productInfo,
      images: images.images.map((image) => image.filename),
    })
    const product = await Product.findOne({ admin, name })
    if (product) return { message: 'This product is already exist' }
    try {
      return await newProduct.save()
    } catch (err) {
      return err
    }
  },
  updateRate: async (info) => {
    const { value, id } = info
    const product = await Product.findByIdAndUpdate(id, {
      $push: {
        rates: info,
      },
      $inc: {
        TotalRates: value,
      },
    })
    return {
      type: product !== null ? true : false,
      body: product !== null ? 'updated' : 'error',
    }
  },

  deleteProduct: async (id) => await Product.findByIdAndDelete(id),
}
