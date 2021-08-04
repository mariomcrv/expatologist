// this is the basic thing about this file
// it is the server! this file receives the requests and responses
// from the frontend to deliver data
// since we use react, our backend will just control data

import path from 'path'
import express from "express"; // this is how to import here
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // this is the module we created to connect with the DB

import productRoutes from "./routes/productRoutes.js"; // this is how we make us of this module
import userRoutes from "./routes/userRoutes.js"; // import of the userRoutes
import orderRoutes from "./routes/orderRoutes.js"; // import of the userRoutes

import { notFound, errorHandler } from "./middleWare/errorMiddleware.js";

dotenv.config(); // We run this method of dotenv to load the content

connectDB(); // excute the connection to the db from the Backend

const app = express(); // app const mantains an instance of express

app.use(express.json()); // PARSE. This allows us to accept json data in the html body

// --PRODUCTS ROUTES

// this app.use completes the http call with whatever is in productRoutes.js
app.use("/api/products", productRoutes);

// --ORDER ROUTES
// this app.se calls the function in the orderRotues files to create an order in the DB
app.use("/api/orders", orderRoutes);

// -- USER ROUTES
app.use("/api/users", userRoutes);

// IMPORTANT --> THESE ARE THE ACTIONS TO FOLLOW DURING PRODUCTION
const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound); // erorr handler when we go to a url that is not a route error 404

app.use(errorHandler); // when we go to a route with incorrect params

const PORT = process.env.PORT || 5000; // this means OR if not found

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
