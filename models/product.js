var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: String,
  description: String,
  rating: Number,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
