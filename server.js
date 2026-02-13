// server.js — Dark MD Pair Site (8-digit demo code)

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// public folder میں HTML, CSS, JS serve کرنا
app.use(express.static(path.join(__dirname, "public")));

// Root route — index.html serve کرے
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// /code API route — number لے کر 8-digit random code دے گا
app.get("/code", (req, res) => {
    const number = req.query.number;

    if (!number) {
        return res.json({ code: "Number Missing" });
    }

    // 8-digit random code generate (demo)
    const randomCode = Math.floor(10000000 + Math.random() * 90000000);

    res.json({ code: randomCode });
});

// server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
