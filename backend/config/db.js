import mongoose from "mongoose"; // we import mongoose

// we need to make this function async await becuase mongoose will
// always return a promise, that is why we wrap it in a try catch block
const connectDB = async () => {
  try {

    // the var conn will contain the details of the connection
    // when we connect to our database, we need to specify the uri and
    // a set of configs {}
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });


    // once we are connected, we log the details of the connection
    // at this po0int the var conn has details we can log
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // now, if the connection fails, we catch the error
    // console log the error message
    // exit the process, passing one will exit with failure
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// do not forger to export the module we did it with a different name
export default connectDB;
