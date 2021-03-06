import asyncHandler from "express-async-handler"; // error handler
import Product from "../models/productModel.js"; // PRODUCT MODEL

//@desc Fetch all products
//@route GET/api/products
//@access Public

// this function returns the results from the search box in the front end
// the OR operators allows me to search multiple fields
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const products = await Product.find({ ...keyword });

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

//@desc delete a product
//@route DELETE /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // here we can find by id, so the :id
  // thing is what we use to complete the call thanks to the params contained in the request <req>

  if (product) {
    await product.remove();
    res.json({
      message: "Counsellor removed",
    });
  } else {
    res.status(404); // we set the status of the response to 404 if no product
    throw new Error("Counsellor not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample counsellor" ,
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample country",
    category: "Sample specialization",
    // field below is not necessary
    countInStock: 0,
    // filed below might be considered for further functionality
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  // find the therapist by id and keep ip in a var
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// export functions
export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
