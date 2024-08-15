const db = require("../config/db");

const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM user_tests");
  return result;
};
const createUser = async (uid,fname, lname, username, avater) => {
    const result = await db.query(
      'INSERT INTO user_tests (id,fname, lname, username, avater) VALUES ($1, $2, $3, $4,$5) RETURNING *',
      [uid,fname, lname, username, avater]
    );
    return result;
  };

const  getByIdUser =async(id)=>{
   const result =await db.one('SELECT * FROM user_tests WHERE id = $1', [id])
   return result
}  

const updateUser = async (id, fname, lname, username, avater) => {
    const result = await db.one(
      'UPDATE user_tests SET fname = $1, lname = $2, username = $3, avater = $4 WHERE id = $5 RETURNING *',
      [fname, lname, username, avater, id]
    );
    return result;
  };
const deleteUser = async (id) => {
    try {
        const result = await db.oneOrNone('DELETE FROM user_tests WHERE id = $1 RETURNING *', [id]);
        return result;
    } catch (error) {
        throw new Error('Database Error: ' + error.message);
    }
};
module.exports = {
  getAllUsers,
  createUser,
  getByIdUser,
  deleteUser,
  updateUser
};
