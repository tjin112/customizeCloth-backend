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
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
