const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // ==========================
  // Mongoose Validation Error
  // ==========================
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";

    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  // ==========================
  // Invalid MongoDB ObjectId
  // ==========================
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  }

  // ==========================
  // Duplicate Key Error
  // ==========================
  else if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyPattern)[0];

    message = `${field} already exists`;

    errors = [
      {
        field,
        message,
      },
    ];
  }

  // ==========================
  // JWT Errors
  // ==========================
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid access token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Access token expired";
  }

  // ==========================
  // Log only server errors
  // ==========================
  if (statusCode >= 500) {
    console.error("========== ERROR ==========");
    console.error("Time:", new Date().toISOString());
    console.error("Method:", req.method);
    console.error("URL:", req.originalUrl);
    console.error("Message:", err.message);
    console.error(err.stack);
    console.error("===========================");
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export default errorHandler;
