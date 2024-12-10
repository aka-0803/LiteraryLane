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

const deleteController = async (req, res) => {
  try {
    const id = req.params.id;
    await Book.findByIdAndDelete(id);
    return res.status(200).send({
      code: 1,
      message: "Successfully deleted the Book",
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const getAllBooksController = async (req, res) => {
  try {
    const data = await Book.find().sort({ createdAt: -1 });
    return res.status(200).send({
      code: 1,
      totalCount: data.length,
      Books: data,
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const getRecentController = async (req, res) => {
  try {
    const data = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).send({
      code: 1,
      totalCount: data.length,
      Books: data,
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const getController = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({
        code: 0,
        message: `Book not found`,
      });
    }
    return res.status(200).send({
      code: 1,
      data: book,
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};
module.exports = {
  addBookController,
  updateController,
  deleteController,
  getAllBooksController,
  getRecentController,
  getController,
};
