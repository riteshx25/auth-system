import { body, validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

export const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  console.log(errors.array());

  const formattedErrors = errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  next(new ApiError(400, "Validation failed", formattedErrors));
};

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),

  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  validator,
];
