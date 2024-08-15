const express = require('express');
const route = express.Router();
const upload = require('../Middleware/uploads');
const { createProduct } = require('../Controllers/product.controller');


// CRUD routes for products
route.post('/products', upload.single('image'), createProduct);

module.exports = route;
