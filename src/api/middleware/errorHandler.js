const ErrroResponse = require("../../utils/errorResponse");

const errorHandler = (err, req, res,next) => {
  let error = { ...err };

  console.log(error)
  console.log(err)

  error.message = err.message;

  console.log(error)

  if (err.code === 1100) {
    const message = "Duplicate Field Value";
    error = new ErrroResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrroResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Server Error", data: false });
};

module.exports = errorHandler;
