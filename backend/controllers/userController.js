import asyncHandler from "express-async-handler"; // error handler
import User from "../models/userModel.js"; // PRODUCT MODEL
import generateToken from "../utils/generateToken.js"; // token module

//@desc authenticate users and get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // here we extract the data from the json object

  const user = await User.findOne({ email }); // this will use the model to find an email matching the one from the request

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // the token module and we pass the user id
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc register new users
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // here we extract the data from the json object, we need three peaces of data from the body

  const userExist = await User.findOne({ email }); // this will use the model to find an email matching the one from the request

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc get to the user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile };
