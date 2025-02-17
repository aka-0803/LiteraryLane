const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connect");
const cors = require("cors");
dotenv.config();

//DB connection
connectDB();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1", require("./routes/user"));
app.use("/api/v1/books", require("./routes/book"));
app.use("/api/v1/favourites", require("./routes/favourite"));
app.use("/api/v1/cart",require('./routes/cart'));
app.use("/api/v1/order",require('./routes/order'));
app.get("/", (req, res) => {
  res.send("hello just started");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
