import jwt from "jsonwebtoken"; // jsw token
import expressAsyncHandler from "express-async-handler"; // I need this to handle async functions
import User from "../models/userModel.js"; // I need the user model

// this file is basically a module or function that I call to authenticate my user
const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  // console.log(req.headers.authorization); // with this, I will log the key when I execute this function

  //if the token exists and also starts with...
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("token found");
    try {
      token = req.headers.authorization.split(" ")[1]; // here, i store the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // we use jwt to verify the token and the secret

      req.user = await User.findById(decoded.id).select('-password') // this prevents the password to be shared
      // console.log(decoded); // log the token

      next()
    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed') // this thows a new message
    }
  }

  // if no token
  if (!token) {
    res.status(401); // in the response, set status to error
    throw new Error("Token not authorized"); // send a custom error message
  }
});

// with this middleware we validate if the user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin };
