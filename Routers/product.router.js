const express = require("express");
const route = express.Router();
const upload = require("../Middleware/uploads");
const {
  createProduct,
  getAll,
  getByIG,
  update,
} = require("../Controllers/product.controller");

// CRUD routes for products
route.post("/products", upload.single("image"), createProduct);
route.get("/products/GetAll", getAll);
route.get("/products/GetById/:id", getByIG);
route.put("/products/update/:id", upload.single("image"), update);

module.exports = route;
