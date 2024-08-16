const express = require("express");
const app = express();
const { readdirSync } = require('fs');
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const db = require('./config/db')

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use("/api/uploads", express.static("./tmp/uploads"));

// MongoDB connection
// connectDB();

// Routes
readdirSync("./Routers").map((r) => app.use("/api", require("./Routers/" + r)));

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port: http://localhost:${process.env.PORT}`);
});
