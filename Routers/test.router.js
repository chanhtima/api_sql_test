const express = require("express");
const route = express.Router();
const { getList } = require("../Controllers/test.contorllers");


route.get('/test/get',getList)
route.post('/test/post',getList)



module.exports = route