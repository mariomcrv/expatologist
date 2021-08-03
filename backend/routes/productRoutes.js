import express from "express";
const router = express.Router(); // express router
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";
import {protect, admin} from '../middleware/authMiddleware.js'


// The routes call the functions from the controllers, this way I keep the code a bit cleaner
router.route("/").get(getProducts).post(protect, admin, createProduct); // we call the getproducts functions when calling the route
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct); // we call the getproductbyID functions when calling the route


export default router; // we cont export the module but the router inside the module
