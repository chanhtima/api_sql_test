const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
// const db = pgp({
//     connectionString: process.env.POSTGRES_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
db.connect()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch(error => {
        console.error("Database connection error:", error.message);
    });

module.exports = db;
