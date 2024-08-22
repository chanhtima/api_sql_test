const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const ProductPost = async (name, description, price, upload_id) => {
  const uid = uuidv4();
  const result = await db.one(
    "INSERT INTO products (id,name, description, price, upload_id) VALUES ($1, $2, $3, $4,$5) RETURNING *",
    [uid, name, description, price, upload_id]
  );
  return result;
};
const getAll = async (name = "", limit = 10, offset = 0) => {
  // ค้นหาข้อมูลที่กรองตามชื่อ (name) และเพิ่มการจำกัดจำนวนรายการ (LIMIT)
  const result = await db.query(
    `SELECT * FROM products
     WHERE name ILIKE $1
     LIMIT $2 OFFSET $3`,
    [`%${name}%`, limit, offset]
  );

  // คำนวณผลรวมของตาราง
  const countResult = await db.one(
    `SELECT COUNT(*) as count FROM products
     WHERE name ILIKE $1`,
    [`%${name}%`]
  );

  return { products: result, total: parseInt(countResult.count, 10) };
};
const getById = async (id) => {
  const result = await db.one("SELECT * FROM products WHERE id = $1", [id]);
  // console.log("result",result)
  return result;
};
const update = async (id, name, description, price, upload_id) => {
  if (!id) {
    throw new Error("ID is required to update the product");
  }

  // Start constructing the SQL query
  let query = "UPDATE products SET";
  const params = [id];
  let paramIndex = 2;

  // Add columns only if their values are provided
  if (name !== undefined) {
    query += ` name = $${paramIndex++},`;
    params.push(name);
  }
  if (description !== undefined) {
    query += ` description = $${paramIndex++},`;
    params.push(description);
  }
  if (price !== undefined) {
    query += ` price = $${paramIndex++},`;
    params.push(price);
  }
  if (upload_id !== undefined) {
    query += ` upload_id = $${paramIndex++},`;
    params.push(upload_id);
  }

  // Remove trailing comma and add WHERE clause
  query = query.slice(0, -1) + ` WHERE id = $1 RETURNING *`;

  // Execute the query
  const result = await db.oneOrNone(query, params);

  if (!result) {
    throw new Error("Product not found or no data updated");
  }

  return result;
};
const deleteModel = async(id)=>{
  try {
  const result =await db.oneOrNone(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  )
  return result;
} catch (error) {
  throw new Error("Database Error: " + error.message);
}
}
 
module.exports = {
  ProductPost,
  getAll,
  getById,
  update,
  deleteModel
};
