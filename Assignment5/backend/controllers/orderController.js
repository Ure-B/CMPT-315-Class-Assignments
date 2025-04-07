const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { productId, quantity, email, deliveryDate } = req.body;
  
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
  
      const order = new Order({ productId, quantity, email, deliveryDate });
      await order.save();

      await session.commitTransaction();
      session.endSession();

      product.stock -= quantity;
      await product.save();
  
      res.status(201).json({ message: "Order placed successfully!", order });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};
 
const getOrders = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

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

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ orders: formattedOrders });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate('productId'); 
  
      if (!order) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: "Order not found" });
      }
  
      const today = new Date();
      const fiveDaysFromNow = new Date(today);
      fiveDaysFromNow.setDate(today.getDate() + 5);
  
      if (new Date(order.deliveryDate) <= fiveDaysFromNow) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: "Cannot cancel order within 5 days of delivery date" });
      }
  
      const product = order.productId;
      product.stock += order.quantity; 
  
      await product.save();
  
      await Order.findByIdAndDelete(id);
  
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: "Order cancelled successfully!" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ error: error.message });
    }
  };  

module.exports = {
    placeOrder,
    getOrders,
    cancelOrder
};