const mongoose = require("mongoose");
const Product = require("./models/Product");
const Order = require("./models/Order"); // Import the Order model

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/productOrderingDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB replica set");
    console.log("Connected to database:", mongoose.connection.name);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

const sampleProducts = [
  { name: "Laptop", price: 1200, stock: 5, category: "Electronics" },
  { name: "Smartphone", price: 800, stock: 10, category: "Electronics" },
  { name: "Tablet", price: 400, stock: 0, category: "Electronics" },
  { name: "Headphones", price: 100, stock: 15, category: "Accessories" },
  { name: "Keyboard", price: 50, stock: 20, category: "Accessories" },
  { name: "Mouse", price: 40, stock: 25, category: "Accessories" },
  { name: "Monitor", price: 250, stock: 10, category: "Electronics" },
  { name: "Chair", price: 150, stock: 0, category: "Furniture" },
  { name: "Desk", price: 200, stock: 3, category: "Furniture" },
  { name: "Printer", price: 300, stock: 2, category: "Electronics" },
  { name: "Webcam", price: 70, stock: 6, category: "Accessories" },
  { name: "Speakers", price: 120, stock: 0, category: "Accessories" },
  { name: "External Hard Drive", price: 80, stock: 12, category: "Storage" },
  { name: "Gaming Console", price: 500, stock: 7, category: "Gaming" },
  { name: "Graphics Card", price: 600, stock: 4, category: "Gaming" },
];

const sampleOrders = [
  {
    productName: "Laptop",
    quantity: 2,
    email: "customer1@example.com",
    deliveryDate: new Date("2025-05-01"),
  },
  {
    productName: "Smartphone",
    quantity: 1,
    email: "customer2@example.com",
    deliveryDate: new Date("2025-05-03"),
  },
  {
    productName: "Headphones",
    quantity: 3,
    email: "customer3@example.com",
    deliveryDate: new Date("2025-05-10"),
  },
];

const addFakeData = async () => {
  try {
    await Product.deleteMany(); 
    await Product.insertMany(sampleProducts);
    console.log("Fake products added successfully!");

    const products = await Product.find();

    await Order.deleteMany(); 
    for (let orderData of sampleOrders) {
      const product = products.find((p) => p.name === orderData.productName);
      if (product) {
        const order = new Order({
          productId: product._id,
          quantity: orderData.quantity,
          email: orderData.email,
          deliveryDate: orderData.deliveryDate,
        });
        await order.save(); 
        console.log(`Order for ${orderData.productName} added successfully!`);
      } else {
        console.log(`Product ${orderData.productName} not found for order.`);
      }
    }

    console.log("Fake orders added successfully!");
  } catch (error) {
    console.error("Error adding fake data to database:", error);
    mongoose.connection.close();
  }
};

module.exports = { connectDB, addFakeData };