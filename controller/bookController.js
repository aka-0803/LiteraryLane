const Book = require("../model/book");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const addBookController = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(400).send({
        code: 0,
        message: "You do not have access to admin work",
      });
    }
    const newBook = new Book({
      url: req.body.url,
      title: req.body.title,
      price: req.body.price,
      author: req.body.author,
      desc: req.body.desc,
      language: req.body.language,
    });
    await newBook.save();
    return res.status(200).send({
      code: 1,
      message: "new book added",
      data: newBook,
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const updateController = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndUpdate(bookId, {
      url: req.body.url,
      title: req.body.title,
      price: req.body.price,
      author: req.body.author,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).send({
      code: 1,
      id: bookId,
      message: "Updated the Book!",
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const deleteController = async (req, res) => {};

module.exports = { addBookController, updateController, deleteController };
