const pgp = require("pg-promise")();
require("dotenv").config();

const db = pgp({
  //   user: process.env.DB_USER,
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   database: process.env.DB_DATABASE,
  //   password: process.env.DB_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: { rejectUnauthorized: false },
});
db.connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

module.exports = db;
