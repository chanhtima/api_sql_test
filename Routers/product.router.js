const express = require('express');
const route = express.Router();
const upload = require('../Middleware/uploads');
const { createProduct, getAll } = require('../Controllers/product.controller');
const { getAllUsers } = require('../Models/user.model');


// CRUD routes for products
route.post('/products', upload.single('image'), createProduct);
route.get('/products/GetAll', getAll)

module.exports = route;
