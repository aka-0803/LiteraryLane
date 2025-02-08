const express = require("express");
const { authenticateToken } = require("../middlewares/userAuth");
const {
  createOrderController,
  getOrderController,
  getAllOrdersController,
  updateOrderController,
} = require("../controller/orderController");

const router = express.Router();
//place order
router.post("/place-order", authenticateToken, createOrderController);

//get order history of a particular user
router.get("/get-order", authenticateToken, getOrderController);

//get all orders
router.get("/get-all-orders", authenticateToken, getAllOrdersController);

//edit order
router.put("/edit-order/:id", authenticateToken, updateOrderController);

module.exports = router;
