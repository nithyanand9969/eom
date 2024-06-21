const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  ratings: String,
  images: [
    {
      image: String,
    },
  ],
  category: String,
  seller: String,
  stock: Number,
  numberofReview: String,
  createdAt: Date,
});

const productModel = mongoose.model("product", ProductSchema);

module.exports = productModel;
