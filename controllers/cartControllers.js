const Product = require("../models/Product");
const Cart = require("../models/Cart");
module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity, attr, details } = req.body;
    const product = await Product.findOne({ _id: cartItem }); // 假设 Product 模型中有一个名为 cartItem 的字段
    const productPrice = product ? product.price : 0; // 如果找不到对应的产品，则价格为0

    try {
      const cart = await Cart.findOne({ userId });
      // if cart already exist, add quantity
      if (cart) {
        const existingProducts = cart.products.filter(
          (product) => product.cartItem.toString() === cartItem
        );
        if (existingProducts.length > 0) {
          let productFound = false;
          for (const existingProduct of existingProducts) {
            // Check if the existing product has the same attributes and details
            if (
              existingProduct.attr === attr &&
              JSON.stringify(existingProduct.details) ===
                JSON.stringify(details)
            ) {
              existingProduct.quantity += 1;
              productFound = true;
              break;
            }
          }
          if (!productFound) {
            // If attributes or details are different, add it as a new item
            cart.products.push({
              cartItem,
              quantity,
              attr,
              details,
            });
          }
        } else {
          cart.products.push({
            cartItem,
            quantity,
            attr,
            details,
          });
        }
        await cart.save();
        // Calculate total price
        let totalPrice = 0;
        for (const product of cart.products) {
          // Assuming each product has a "quantity" property
          totalPrice += product.quantity * productPrice; // 使用产品的价格计算总价
        }

        // Update cart total price
        totalPrice = totalPrice.toFixed(2);
        cart.totalPrice = totalPrice;
        console.log("totalPrice", totalPrice, productPrice);
        await cart.save();
        res.status(200).json({ message: "Successfully added to cart" });
      }
      //   if cart not exist, create new cart for user
      else {
        const newCart = new Cart({
          userId,
          products: [{ cartItem, quantity: quantity, attr, details }],
          totalPrice: (quantity * productPrice).toFixed(2), // 使用产品的价格计算总价
        });
        await newCart.save();

        res.status(200).json({ message: "Successfully added to cart" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
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
