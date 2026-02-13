// server.js — DARK_MD-146 Pair Site (Updated)
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const codeRoute = require('./pair'); // pair route handle /code API
const app = express();
const PORT = process.env.PORT || 8000;

// Max listeners increase
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// /code API
app.use('/code', codeRoute);

// Serve index/pair HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html')); // ensure pair.html exists
});

// Serve any static files (CSS/JS) if needed
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`
✅ Deployment Successful!
🖤 DARK_MD-146 Session-Server Running on http://localhost:${PORT}
`);
});

module.exports = app;
