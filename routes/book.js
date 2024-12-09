const express = require("express");
const { authenticateToken } = require("../middlewares/userAuth");
const {
  updateController,
  deleteController,
  addBookController,
} = require("../controller/bookController");

const router = express.Router();

//add book || post
router.post("/add", authenticateToken, addBookController);

//update book || put
router.put("/update/:id", authenticateToken, updateController);

//delete book || delete
router.delete("/delete", authenticateToken, deleteController);

module.exports = router;
