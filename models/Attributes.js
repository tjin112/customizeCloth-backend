const mongoose = require("mongoose");
const AttributesSchema = new mongoose.Schema(
  {
    attrName: {
      type: String,
      required: true,
    },
    attr: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attributes", AttributesSchema);
