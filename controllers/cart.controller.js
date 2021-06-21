const Cart = require('../models/Cart')

module.exports = {
  getOne: async (product) => Cart.findOne({ product }),
  getAll: async (id) => await Cart.find({ userId: id }),
  addToCart: async (data) => {
    const { product, userId } = data

    const newAddedProduect = new Cart({
      product,
      userId,
    })
    try {
      return await newAddedProduect.save()
    } catch (err) {
      return err
    }
  },
  updateAmount: async (data) => {
    const { type, id } = data
    const cart = await Cart.findById(id)
    return type === 'up'
      ? cart.product.amount === cart.amount
        ? { message: `We Have only ${cart.product.amount} Chairs` }
        : await Cart.findOneAndUpdate(
          { _id: id },
          { $inc: { amount: 1 } },
          { new: true }
        )
      : cart.amount === 1
        ? await Cart.deleteOne({ _id: id })
        : await Cart.findOneAndUpdate(
          { _id: id },
          { $inc: { amount: -1 } },
          { new: true }
        )
  },
  deleteFromCart: async (id) => {
    const product = await Cart.findByIdAndDelete(id)
    return {
      type:  product !== null,
      body: product || 'no match',
    }
  },
}
