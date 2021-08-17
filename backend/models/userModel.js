import mongoose from "mongoose"; // we import our mongoose module to use it here
import bcrypt from "bcryptjs";

// create a const with the name of the schema to be equal to our schema
const userSchema = mongoose.Schema(
  //first param is the schema, second is timestamps
  {
    name: {
      // name of the field
      type: String, // type string
      required: true, // cannot be empty
    },
    email: {
      // name of the field
      type: String, // of type string
      required: true, // cannot be empty
      unique: true, // must be unique, not repetition
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      // admin field
      type: Boolean, // boolean type, yes or no, true or false
      required: true, // needed
      default: false, // the default value is false
    },
  },
  {
    timestamps: true, // extra param that adds time stampts automatically
  }
); // end of the schema

// -- METHOD TO VALIDATE PASSWORDS --

// Need to use a async function
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // the bcrypt middleware will copare passwords
};

// -- before saving the password, we need to encrypt it --
userSchema.pre("save", async function (next) { 

  // this if statement allows us to edit the password, otherwise we would 
  // create a new hash every time. Future edit profile functionality
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // this method generates the salt
  this.password = await bcrypt.hash(this.password, salt); // this one takes the password and hashes it using the salt
});

const User = mongoose.model("User", userSchema);

export default User;
