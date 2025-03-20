const express = require("express");
const cors = require("cors");
const { connectDB, addFakeData } = require("./database");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

connectDB();  
addFakeData();   

app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});