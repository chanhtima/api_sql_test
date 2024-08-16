const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: { rejectUnauthorized: false }
});
// const db = pgp({
//     connectionString: process.env.POSTGRES_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
  
db.connect()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch(error => {
        console.error("Database connection error:", error.message);
    });

module.exports = db;
