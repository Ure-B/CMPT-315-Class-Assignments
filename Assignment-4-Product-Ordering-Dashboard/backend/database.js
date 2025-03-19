const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/productOrderingDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB replica set");
        console.log("Connected to database:", mongoose.connection.name);
      })
      .catch((err) => console.error("MongoDB Connection Error:", err));
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;