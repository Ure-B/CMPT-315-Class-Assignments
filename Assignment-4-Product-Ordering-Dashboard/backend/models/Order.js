const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  deliveryDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: "Delivery date must be in the future",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
