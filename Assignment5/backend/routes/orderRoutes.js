const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getOrders,
    cancelOrder,
} = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", placeOrder);
router.put("/cancel/:id", cancelOrder);

module.exports = router;