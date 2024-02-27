const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    subtitle: { type: String },
    supplier: { type: String, require: true },
    price: { type: String, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String, require: true },
    product_location: { type: String, require: true },
    pid: { type: String, require: true },
    cid: { type: String, require: true },
    attributes: {
      type: Object,
    },
    color: { type: Array},
    fabric: [
      {
        name: {
          type: String,
          require: true,
        },
        imageUrl: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
