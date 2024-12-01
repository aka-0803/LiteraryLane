const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("hello just started");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
