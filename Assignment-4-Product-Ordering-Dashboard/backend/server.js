const express = require("express");
const cors = require("cors");

const connectDB = require("./database");

const app = express();
const PORT = 8080;

connectDB();

const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`REST API is running at http://localhost:${PORT}`);
});