const Product = require("../models/Product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const products = await Product.find();

        await session.commitTransaction();
        session.endSession();

        res.status(200).json(products);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
};