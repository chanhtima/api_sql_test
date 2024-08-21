const db = require("../config/db");
const { v4: uuidv4 } = require("uuid"); // Import the uuidv4 function


const uploadPost = async (filename, mimetype, size) => {
  const url = `/uploads/${filename}`;
  const uid = uuidv4();
  const result = await db.query(
    `INSERT INTO uploads (id, filename, mimetype, size, upload_date, url)
     VALUES ($1, $2, $3, $4, NOW(), $5) 
     RETURNING *`,
    [uid, filename, mimetype, size, url]
  );
  return result;
};
const uploadGet = async (id) => {
  const result = await db.one("SELECT * FROM uploads WHERE id = $1", [id]);
  return result;
};
const uploadPostId = async (filename, mimetype, size) => {
  const url = filename ? `/uploads/${filename}` : null;
  const uid = uuidv4();
  const result = await db.one(
    `INSERT INTO uploads (id, filename, mimetype, size, url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [uid, filename, mimetype, size, url]
  );
  return result.id;
};
module.exports = {
  uploadGet,
  uploadPost,
  uploadPostId,
};
