import OrderModel from "../models/orderSchema.js";
import User from "../models/userSchema.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await OrderModel.find().populate("books");
    res.json({ success: true, data: allOrders });
  } catch (err) {
    next(err);
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const singleOrder = await OrderModel.findById(req.params.id);
    /* .populate("books", "title")
        .populate("useId", "-id -password -email"); */
    res.json({ success: true, data: singleOrder });
  } catch (err) {
    next(err);
  }
};

export const getOrdersByUserId = async (req, res, next) => {
  try {
    const singleOrderById = await OrderModel.find({ userId: req.params.id });
    /*     .populate("books", "title")
        //   .populate({path: "books", select: {title: 1, _id: 0}})
        .populate("userId", "-_id -password -email"); */
    res.json({ success: true, data: singleOrderById });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { orders: order._id } },
      { new: true }
    );
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updateOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updateOrder });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrder = await OrderModel.findByIdAndDelete(req.params.id);
    res.send({ success: true, message: "Your Order was deleted!" });
  } catch (err) {
    next(err);
  }
};
