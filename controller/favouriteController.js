const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addToFavouriteController = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const id = req.query.user_id;
    const userData = await User.findById(id);
    const isAlredyFavourite = userData.favourites.includes(bookId);
    if (isAlredyFavourite) {
      return res.status(200).send({
        code: 0,
        message: "Is already added to favourites!",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookId } });
    return res.status(200).send({
      code: 1,
      message: "Added to favourites!",
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const deleteController = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const id = req.query.user_id;
    const userData = await User.findById(id);
    const isAlredyFavourite = userData.favourites.includes(bookId);
    if (isAlredyFavourite) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });
      return res.status(200).send({
        code: 1,
        message: "Deleted from favourites!",
      });
    }
    return res.status(200).send({
      code: 0,
      message: "Book was not in favourites",
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const getFavouriteController = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id).populate("favourites");
    const favourites = userData.favourites;
    return res.status(200).send({
      code: 1,
      totalCount: favourites.length,
      data: favourites,
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = {
  addToFavouriteController,
  deleteController,
  getFavouriteController,
};
