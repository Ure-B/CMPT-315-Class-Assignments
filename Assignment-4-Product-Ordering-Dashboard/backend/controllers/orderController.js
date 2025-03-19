const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { productId, quantity, emailId, deliveryDate } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: "Product not found" });
      }
  
      if (product.stock < quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: "Insufficient stock available" });
      }
  
      product.stock -= quantity;
      await product.save();
  
      const order = new Order({ productId, quantity, emailId, deliveryDate });
      await order.save();

      await session.commitTransaction();
      session.endSession();
  
      res.status(201).json({ message: "Order placed successfully!", order });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("productId", "name") 
            .select("_id productId quantity deliveryDate email"); 

        const formattedOrders = orders.map(order => ({
            orderId: order._id,
            productName: order.productId.name,
            quantity: order.quantity,
            deliveryDate: order.deliveryDate,
            email: order.email
        }));

        res.status(200).json({ orders: formattedOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    placeOrder,
    getOrders,
};