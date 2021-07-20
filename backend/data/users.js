// Again, this file is a JS module
// to create data to feed mongoatlas

// lets create and array of users with 3 objects of type user, one is an admin
// of course we need to have ONLY, the fields that
// we have in the user model or mongoose wont let us insert data

// debug, I had a typo, amail instead of email, unmatching with the model and causing errors here, smart guy Mario

import bcryptjs from "bcryptjs";

const users = [ // array of users containing objects of type user
  {
    name: "Admin User",
    email: "admin@example.com",
    // call bcrypt module, function hashSync and pass in the password
    // and security level
    password: bcryptjs.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcryptjs.hashSync('123456', 10),
    isAdmin: false, // we do not need this because the default for this is false in the model
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcryptjs.hashSync('123456', 10),
  },
];

export default users;