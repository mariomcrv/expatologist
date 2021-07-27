import express from "express";
const router = express.Router(); // express router
import {
  authUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// this route is in charge of creating new users
router.route("/").post(registerUser);
// The routes call the functions from the controllers, this way I keep the code a bit cleaner
router.post("/login", authUser);
// below, to implement the middle ware, I just put it as a first argument
router.route("/profile").get(protect, getUserProfile); // I use route because i will make a get and a put request with the same route

export default router; // we cont export the module but the router inside the module
