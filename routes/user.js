const express = require("express");
const {
  loginController,
  registerController,
} = require("../controller/userController");
const router = express.Router();

//register || post

router.post("/sign-up", registerController);

//login || post
router.post("/sign-in", loginController);

module.exports = router;
