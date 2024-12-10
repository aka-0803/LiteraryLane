const express = require("express");
const { authenticateToken } = require("../middlewares/userAuth");
const {
  updateController,
  deleteController,
  addBookController,
  getAllBooksController,
  getRecentController,
  getController,
} = require("../controller/bookController");

const router = express.Router();

//add book || post
router.post("/add", authenticateToken, addBookController);

//update book || put
router.put("/update/:id", authenticateToken, updateController);

//delete book || delete
router.delete("/delete/:id", authenticateToken, deleteController);

//get all books || get
router.get("/get-all-books", authenticateToken, getAllBooksController);

//get recent books
router.get("/get-recent-books", authenticateToken, getRecentController);

//get book by id
router.get("/get/:id", authenticateToken, getController);

module.exports = router;
