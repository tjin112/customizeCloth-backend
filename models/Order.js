const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    customerId: { type: String, require: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    quantity: { type: Number, require: true },
    subtotal: { type: Number, require: true },
    total: { type: Number, require: true },
    delivery_status: { type: Number, default: "pending" },
    payment_status: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
