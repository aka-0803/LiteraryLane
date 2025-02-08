const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../model/order");
const User = require("../model/user");

createOrderController = async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderItem of order) {
      const newOrder = new Order({ user: id, book: orderItem._id });
      const orderDbData = await newOrder.save();
      //push in users cart
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDbData._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderItem._id },
      });
    }
    res.status(200).send({
      code: 1,
      message: "Order placed successfully",
    });
  } catch (error) {
    res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

getOrderController = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    res.status(200).send({
      code: 1,
      totalCount: ordersData.length,
      data: ordersData,
    });
  } catch (error) {
    res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

getAllOrdersController = async (req, res) => {
  try {
    const ordersData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    res.status(200).send({
      code: 1,
      totalCount: ordersData.length,
      data: ordersData,
    });
  } catch (error) {
    res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

updateOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    await Order.findByIdAndUpdate(id, {status});
    res.status(200).send({
      code: 1,
      message: "Order updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = {
  createOrderController,
  getOrderController,
  getAllOrdersController,
  updateOrderController,
};
