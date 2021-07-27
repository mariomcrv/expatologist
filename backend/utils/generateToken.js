import jwt from "jsonwebtoken"; // import json web tokens

const generateToken = (id) => {
  // the arrow function takes a user id
  // return sign and the payload is the if, the second argument is the SECRET env file
  // the third argument is the set of options, in this case the token will expire in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
