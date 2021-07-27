import asyncHandler from "express-async-handler"; // error handler
import Product from "../models/productModel.js"; // PRODUCT MODEL

//@desc Fetch all products
//@route GET/api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//@desc Fetch single products
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // here we can find by id, so the :id
  // thing is what we use to complete the call thanks to the params contained in the request <req>

  if (product) {
    res.json(product); // if the product is not empty, we return it
  } else {
    res.status(404); // we set the status of the response to 404 if no product
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
