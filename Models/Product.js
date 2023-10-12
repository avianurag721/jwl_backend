const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  imgUrl: [],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
