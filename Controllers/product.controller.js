const db = require('../config/db');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const url = req.file ? `/uploads/${req.file.filename}` : null;
    let upload_id = null;
    if (req.file) {
      const { filename, mimetype, size } = req.file;
      const uploadResult = await db.one(
        'INSERT INTO uploads (filename, mimetype, size, url) VALUES ($1, $2, $3, $4) RETURNING id',
        [filename, mimetype, size, url]
      );
      upload_id = uploadResult.id;
    }
    const result = await db.one(
      'INSERT INTO products (name, description, price, upload_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, upload_id]
    );

    res.status(201).json({
      message: 'Product created successfully!',
      product: result,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'Failed to create product.',
      error: error.message,
    });
  }
};
