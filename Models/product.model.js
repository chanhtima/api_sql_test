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

module.exports = {
  ProductPost,
  getAll,
  getById,
};
