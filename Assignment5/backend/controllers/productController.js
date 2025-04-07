const Product = require("../models/Product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { sort, order, category, price_gte, price_lte } = req.query;

        let filter = {};
        let sortOption = {};

        // Handle Filtering
        if (category) {
            filter.category = category;
        }
        if (price_gte || price_lte) {
            filter.price = {};
            if (price_gte) {
                filter.price.$gte = Number(price_gte);
            }
            if (price_lte) {
                filter.price.$lte = Number(price_lte);
            }
        }

        // Handle Sorting
        if (sort) {
            const sortField = sort; 
            const sortOrder = order === "desc" ? -1 : 1; 
            sortOption[sortField] = sortOrder;
        }

        const products = await Product.find(filter).sort(sortOption);

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