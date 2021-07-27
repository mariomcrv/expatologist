// -- ERROR HANDLING AND MIDDLEWARE
// -- this one will be executed when we go to somewhere that is not a route

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// This block below is middleware. We will overwritte the
// default error handler
// we have a function with 4 objects/arguments
// err
// req
// res
// next

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // if error is 200 make it 500 or the status code
  res.status(statusCode); // res with the status code
  res.json({
    // create a json object to reply
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler }; // here we export the functions instead of the module
