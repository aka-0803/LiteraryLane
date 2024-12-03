const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/connect');
dotenv.config();

//DB connection 
connectDB();

const app = express();
app.get("/", (req, res) => {
  res.send("hello just started");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
