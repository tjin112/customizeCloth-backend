const mongoose = require("mongoose");
const FabricSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fabric", FabricSchema);
