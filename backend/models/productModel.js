// check this out, I have TWO schemas here
// > reviews
// >product
// Also, rememeber, at the moment, the reviews are optional
// they are not relevant for the main functionality of the project


import mongoose from "mongoose"; // import mongoose module to map data

const reviewSchema = mongoose.Schema(
  // first param, the schema
  {
    name: { type: String, required: true }, // field, type, required
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { // field name
        // pay attention here. type: <moongose.schema.Types.ObjectID>
        // this means the type is an unique id comming from a ref
        // it is a required value
        // the reference is "User"
        // The reference is how we will link this schema with the user schema
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// product schema
const productSchema = mongoose.Schema(
  {
      // pay attention here as well. 
      // type is an object id
      // the reference is a User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { // name of the therapist
      type: String,
      required: true,
    },
    image: { // profile pic
      type: String,
      required: true,
    },
    brand: { // nationality
      type: String,
      required: true,
    },
    category: { // specialitation eg, psychoanalys ect..
      type: String,
      required: true,
    },
    description: { // same
      type: String,
      required: true,
    },
    // IMPORTANT --->
    // review is an array of review objects
    // since we created the review schema
    // we can just call it
    reviews: [reviewSchema], 
    // rating is gonna be the average of the review ratings
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    numReviews: { // optional
      type: Number,
      required: false,
      default: 0,
    },
    price: { // cost per sesion
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: { // can change for availability instead of stock
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product; // we export it simply like Product
