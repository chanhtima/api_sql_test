const db = require("../config/db");
const productModel = require("../Models/product.model");
const uploadModel = require("../Models/upload.model");
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
  try {
    const { name = "", limit = 10, offset = 0 } = req.query;
    const { products, total } = await productModel.getAll(
      name,
      parseInt(limit),
      parseInt(offset)
    );
    const productWithImages = await Promise.all(
      products.map(async (product) => {
        if (product.upload_id) {
          const image = await uploadModel.uploadGet(product.upload_id);
          return {
            ...product,
            imageUrl: image.url,
          };
        }
        return product;
      })
    );

    res.status(200).json({
      success: true,
      total,
      data: {
        ProductData: productWithImages,
      },
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByIG = async (req, res) => {
  try {
    const product = await productModel.getById(req.params.id);
    if (product) {
      // console.log("product",product);
      res.status(200).json({
        success: true,
        data: product,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "product not found",
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error); 
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
