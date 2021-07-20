import express from "express";
import asyncHandler from "express-async-handler"; // error handler
const router = express.Router(); // express router
import Product from "../models/productModel.js"; // PRODUCT MODEL

//@desc Fetch all products
//@route GET/api/products
//@access Public

router.get(
  // this is called from the sever.js
  "/",
  asyncHandler(async (req, res) => {
    // we wrap the calls with our asyncHanlder to report errors
    const products = await Product.find({}); // prodcut contains the result of Product, the {} means everything, by just calling it, we connect to the DB
    res.json(products); // response transforms the content to json
  })
);

//@desc Fetch single products
//@route GET /api/products/:id
//@access Public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id); // here we can find by id, so the :id
    // thing is what we use to complete the call thanks to the params contained in the request <req>

    if (product) {
      res.json(product); // if the product is not empty, we return it
    } else {
      res.status(404); // we set the status of the response to 404 if no product
      throw new Error("Product not found");
    }

    res.json(product); // this is important, we are returning just the product stored by previous statement
  })
);

export default router; // we cont export the module but the router inside the module
