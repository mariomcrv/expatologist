// this is the module we will use to import data to
// our databse

import mongoose from "mongoose"; // we will use our modules
import dotenv from "dotenv"; // we need access to our mongo uri
import users from "./data/users.js"; // users data
import products from "./data/products.js"; // products data
import User from "./models/userModel.js"; // User model
import Product from "./models/productModel.js"; // Product model
import Order from "./models/orderModel.js"; // Order model
import connectDB from "./config/db.js"; // we need to initialize the connection with the DB

dotenv.config(); // load our env vars

connectDB(); // connect to the DB. This module uses the dotenv to run the database

// --- FUNCTION TO IMPORT DATA----

// arrow function to import data. This returns a promise
// so we use async and await
const importData = async () => {
  try {
    // first we delete data if there is any in the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // now, we import the data from our local files
    // store users in a const to extract the admin
    const createdUsers = await User.insertMany(users); //User is the mongoose model and users is the data

    // this var extracts the admin
    // element 0 is the admin, and we want the id field
    const adminUser = createdUsers[0]._id;

    // ---PRODUCTS---

    // pay attention here. Set sample products on const
    // equal to our products js file containing the products
    // we map every product and return this
    // <...> is the spread operator, which will spread
    // all the data already there and we add the admin user to
    // the user field.
    // the result, every product will have the admin user id in the
    // user id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // we have not stored the products in the database yet

    await Product.insertMany(sampleProducts); // model, instert the products with the admin id in the DB

    console.log("Data Imported"); // message
    process.exit(); // we exit the process, that's it
  } catch (error) {
    console.log(`${error}`); // we pass the error and log it into the console
    process.exit(1); // exit the process with error 1
  }
};

// ---- FUNCTION TO DELETE DATA ----

const destroyData = async () => {
  try {
    // first we delete data if there is any in the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!!"); // message
    process.exit(); // we exit the process, that's it
  } catch (error) {
    console.log(`${error}`); // we pass the error and log it into the console
    process.exit(1); // exit the process with error 1
  }
};

// this section is very interesting
// through the if statement we will execute the functions
// on the terminal.
// we also added a script for this on the package.json file

if (process.argv[2] === "-d") {
  // the 2 index is what is is passed in the terminal
  destroyData(); // so, if we call the module on the teminal "backend/seeder -d" this function will be executed
} else {
  importData(); // else, this one
}
