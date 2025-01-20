const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addToCartController = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const id = req.query.user_id;
    const userData = await User.findById(id);
    const isAlreadyInCart = userData.cart.includes(bookId);
    if (isAlreadyInCart) {
      return res.status(200).send({
        code: 0,
        message: "Is already added to Cart!",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookId } });
    return res.status(200).send({
      code: 1,
      message: "Added to Cart!",
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const deleteCartController = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const id = req.query.user_id;
    const userData = await User.findById(id);
    const isAlreadyInCart = userData.cart.includes(bookId);
    if (isAlreadyInCart) {
      await User.findByIdAndUpdate(id, { $pull: { cart: bookId } });
      return res.status(200).send({
        code: 1,
        message: "Deleted from Cart!",
      });
    }
    return res.status(200).send({
      code: 0,
      message: "Book was not in Cart",
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const getCartController = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.status(200).send({
      code: 1,
      totalCount: cart.length,
      data: cart,
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = {
  addToCartController,
  deleteCartController,
  getCartController,
};
