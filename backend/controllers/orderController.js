import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js"; // this is the schema or model for the orders

//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } =
    req.body; // the orderItems contains the array of items to store

  if (orderItems && orderItems === 0) {
    // throw error if no items found
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, // we will get this value through the token
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    });

    // at this point the order is not saved, we need to call the function .save

    const createdOrder = await order.save();
    // status 201 means something was created
    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }); // this returns the orders by ID
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name"); // this will return all orders to the admin
  res.json(orders);
});



export { addOrderItems, getMyOrders, getOrders };
