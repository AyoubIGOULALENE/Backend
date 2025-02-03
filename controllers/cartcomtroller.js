const express = require('express');
const { validate, Cart } = require('../models/Cart');
const asyncHandler = require("express-async-handler");

const router = express.Router(); // Use `express.Router()`, not `express()`

// 📌 POST route for cart submission
const cartinfo = asyncHandler(async (req, res) => {
  // Validate incoming request body
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Create new cart entry
  const cartEntry = new Cart({
    location: req.body.location    ,
    name: req.body.name,
    productname: req.body.productname,
    state:req.body.state,
    product:req.body.product,
    phone: req.body.phone,
  });

  try {
    const response = await cartEntry.save();
    res.status(201).json(response); // ✅ Send success response
  } catch (err) {
    res.status(500).json({ message: "Error saving cart info", error: err.message });
  }
});

const getcart = asyncHandler(
  async(req,res) => {
    const carts = await Cart.find()
res.status(200).json(carts)
  }
)


module.exports = {cartinfo,getcart}
