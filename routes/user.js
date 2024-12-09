const express = require("express");
const {
  loginController,
  registerController,
} = require("../controller/userController");
const { authenticateToken } = require("../middlewares/userAuth");
const { getUserController } = require("../controller/userController");
const { updateController } = require("../controller/userController");
const router = express.Router();

//register || post

router.post("/sign-up", registerController);

//login || post
router.post("/sign-in", loginController);

//get user || get
router.get("/get-user/:id", authenticateToken, getUserController);

//update address || put
router.put("/update-user/:id", authenticateToken, updateController);
module.exports = router;
