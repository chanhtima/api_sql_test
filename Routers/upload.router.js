const express = require("express");
const route = express.Router();
const upload = require("../Middleware/uploads");  // Import the custom upload middleware
const { postUpload, getById } = require("../Controllers/upload.controller");

route.post('/uploads', upload.single('test'), postUpload);
route.get('/uploads/:id', getById);


module.exports = route;
