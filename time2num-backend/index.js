const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

var cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017";

app.use(
  cors({
    origin: ["http://localhost:5173", "https://time2num-e4729.firebaseapp.com", "https://time2num-e4729.web.app"],
  })
);

app.use("/avatars", express.static(path.join(__dirname, "avatars")));
app.use(bodyParser.json());

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Could not connect to the database", error));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

module.exports = app;
