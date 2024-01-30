const Product = require("../models/Product");
const Cart = require("../models/Cart");
module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      // if cart already exist, add quantity
      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({
            cartItem,
            quantity,
          });
        }
        await cart.save();
        res.status(200).json({ messagee: "Successfully added to cart" });
      }
      //   if cart not exist, create new cart for user
      else {
        const newCart = new Cart({
          userId,
          products: [{ cartItem, quantity: quantity }],
        });
        await newCart.save();
        res.status(200).json({ messagee: "Successfully added to cart" });
      }
    } catch (error) {
      res.status(500).json({ messagee: error });
    }
  },
  getCart: async (req, res) => {
    const userId = req.params.id;

    try {
      console.log(123);
      const cart = await Cart.find({ userId }).populate(
        "products.cartItem",
        "_id title supplier price imageUrl"
      );

      res.status(200).json({ data: cart, message: "successful" });
    } catch (error) {
      res.status(500).json({ messagee: error });
    }
  },
  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItemId;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        {
          "products._id": cartItemId,
        },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );
      if (!updatedCart) {
        return res
          .status(200)
          .json({ data: {}, messagee: "Cart item not found" });
      }
      res
        .status(200)
        .json({ data: updatedCart, messagee: "Successfully deleted" });
    } catch (error) {
      res.status(500).json({ messagee: error });
    }
  },
  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(200).json({ messagee: "Cart not found", data: {} });
      }
      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );

      if (!existingProduct) {
        return res
          .status(200)
          .json({ messagee: "Product not found", data: {} });
      }
      if (existingProduct.quantity === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem
        );
      } else {
        existingProduct.quantity -= 1;
      }
      await cart.save();
      if (existingProduct.quantity === 0) {
        await Cart.updateOne(
          {
            user,
          },
          { $pull: { products: { cartItem } } }
        );
      }
      res.status(200).json({ messagee: "Product updated" });
    } catch (error) {
      res.status(500).json({ messagee: error });
    }
  },
};
