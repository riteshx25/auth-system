import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/api-error.js";

const healthCheck = asyncHandler((req, res) => {
  throw new ApiError(404, "custom made error");
  res.status(200).json({
    message: "Server is healthy",
  });
});

export default healthCheck;
