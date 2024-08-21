const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const uid = uuidv4();
  const passwordHash = await bcrypt.hash(password, 10);
  const query = `
      INSERT INTO registers (id, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
  try {
    const [results] = await db.query(query, [uid, email, passwordHash]);
    res.json({
      message: "Insert successful",
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message,
    });
  }
};
// สร้าง access token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

// สร้าง refresh token
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await db.one(
     "SELECT * FROM registers WHERE email = $1",
      [email]
    );
    const user = userResult;
    if (user && await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({ email: user.email });
      const refreshToken = generateRefreshToken({ email: user.email });
      res.json({
        message: "Login successful",
        email: user.email,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } else {
      res.status(401).json({ message: "Username หรือ Password ไม่ถูกต้อง" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};