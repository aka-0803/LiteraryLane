const express = require("express");
const { authenticateToken } = require("../middlewares/userAuth");
const {
  addToCartController,
  deleteCartController,
  getCartController,
} = require("../controller/cartController");

const router = express.Router();

//add to cart || put
router.post("/add", authenticateToken, addToCartController);

// delete from cart || put
router.put("/delete", authenticateToken, deleteCartController);

//get user cart items || get
router.get("/get/:id", authenticateToken, getCartController);

module.exports = router;
