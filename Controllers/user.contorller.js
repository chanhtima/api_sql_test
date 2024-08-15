const { v4: uuidv4 } = require("uuid"); // Import the uuidv4 function
const userModel = require("../Models/user.model");

exports.get = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  const { fname, lname, username, avater } = req.body;
  try {
    const uid = uuidv4();
    const newUser = await userModel.createUser(
      uid,
      fname,
      lname,
      username,
      avater
    );
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
exports.getById = async (req, res) => {
  try {
    const user = await userModel.getByIdUser(req.params.id);

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
exports.deleteUserHandler = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        success: true,
        message: "Delete Data successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error); // Log the detailed error
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
exports.updatedUser = async (req, res) => {
    const { fname, lname, username, avater } = req.body;
    try {
      const updatedUser = await userModel.updateUser(
        req.params.id,
        fname,
        lname,
        username,
        avater
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: "User Not Found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
