const mongoose = require("mongoose");
const Joi = require("joi");

// Define Mongoose Schema
const cartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 1000,
      required: true,
    },
    productname: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 1000,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 1000,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 1000,
      required: true,
    },
    product: {
      type: Array, // Ensure this is correct based on your data structure
      default:{type:Object},
      required: true,
    },
    phone: {
      type: String, // Changed to String since Number does not support minlength/maxlength
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Define Mongoose Model
const Cart = mongoose.model("Cart", cartSchema);

// Joi Validation Function
function validate(obj) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(1000).required(),
    productname: Joi.string().min(3).max(1000).required(),
    state: Joi.string().min(3).max(1000).required(),
    location: Joi.string().min(3).max(1000).required(),
    product: Joi.array().items(Joi.object()).required(), // Matches Mongoose Schema
    phone: Joi.string()
      .pattern(/^[0-9]+$/) // Ensures only numeric values
      .min(8) // Adjusted to reasonable phone length
      .max(15)
      .required(),
  });

  return schema.validate(obj);
}

module.exports = { validate, Cart };
