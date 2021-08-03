import express from "express";
const router = express.Router(); // express router
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// this route is in charge creating new orders
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);

export default router; // we cont export the module but the router inside the module

// IMPORTANT //
// import the new routes to the server.js file
