const express = require("express");
const { authenticateToken } = require("../middlewares/userAuth");

const router = express.Router();

//get book || get
router.get('/get',authenticateToken)

//update book || put

//delete book || delete

module.exports = router;
