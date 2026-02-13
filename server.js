// server.js — DARK_MD-146 Pair Site (FINAL FIX)

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const codeRoute = require("./pair");

const app = express();
const PORT = process.env.PORT || 10000;

// Max listeners limit
require("events").EventEmitter.defaultMaxListeners = 500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// /code API route
app.use("/code", codeRoute);

// Home route → pair.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pair.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(
    `✅ Deployment Successful!\n🖤 DARK_MD-146 Session-Server Running on port ${PORT}`
  );
});

module.exports = app;
