const express = require("express");
const route = express.Router();
const { get, create, getById,  deleteUserHandler, updatedUser } = require("../Controllers/user.contorller");

route.get('/users/getAll', get)
route.post('/users/create',create)
route.get('/users/getById/:id',getById)
route.delete('/users/delete/:id',deleteUserHandler)
route.put('/users/update/:id',updatedUser)




module.exports = route