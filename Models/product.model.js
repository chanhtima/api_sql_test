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
module.exports = {
  ProductPost,
};
