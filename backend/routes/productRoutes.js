import express from "express";
const router = express.Router(); // express router
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// The routes call the functions from the controllers, this way I keep the code a bit cleaner
router.route("/").get(getProducts); // we call the getproducts functions when calling the route
router.route("/:id").get(getProductById); // we call the getproductbyID functions when calling the route

export default router; // we cont export the module but the router inside the module
