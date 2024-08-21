const db = require("../config/db");
const productModel = require("../Models/product.model");
const uploadModel = require('../Models/upload.model')
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let upload_id = null;
    if (req.file) {
      const { filename, mimetype, size } = req.file;
      const uploadResult = await uploadModel.uploadPostId(
        filename,
        mimetype,
        size
      );
      upload_id = uploadResult;
    }

    const result = await productModel.ProductPost(
      name,
      description,
      price,
      upload_id
    );

    res.status(201).json({
      message: "Product created successfully!",
      product: result,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product.",
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  res.json({
    message: "successfully",
  });
};
