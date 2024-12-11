const express = require("express");
const { authenticateToken } = require("../middlewares/userAuth");
const {
  addToFavouriteController,
  deleteController,
  getFavouriteController,
} = require("../controller/favouriteController");

const router = express.Router();

//add to favourites || put
router.put("/add", authenticateToken, addToFavouriteController);

// delete from favourites || delete
router.delete("/delete", authenticateToken, deleteController);

//get favourite for a user || get
router.get("/get/:id", authenticateToken, getFavouriteController);

module.exports = router;
