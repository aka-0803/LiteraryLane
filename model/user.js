const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  favourites: [{ type: mongoose.Types.ObjectId, ref: "books" }],
  cart: [{ type: mongoose.Types.ObjectId, ref: "books" }],
  orders: [{ type: mongoose.Types.ObjectId, ref: "order" }],
},{timestamps:true});

module.exports = mongoose.model("user",userSchema);
