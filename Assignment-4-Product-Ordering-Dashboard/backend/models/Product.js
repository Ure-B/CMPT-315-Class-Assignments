const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Electronics", "Clothing", "Home", "Books", "Toys", "Other"], 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Product = mongoose.model("products", productSchema);
module.exports = Product;
