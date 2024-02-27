const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    products: [
      {
        cartItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        attr: {
          type: String,
          require: true,
        },
        details: {
          type: Object,
          require: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0, // 默认值为0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
