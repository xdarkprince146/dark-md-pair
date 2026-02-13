// server.js — Dark MD Pair Site (8-digit demo code)

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// public folder میں HTML اور CSS serve کرنا
app.use(express.static(path.join(__dirname, "public")));

// /code API route — یہ number لے کر 8-digit random code دے گا (demo purpose)
app.get("/code", async (req, res) => {
    const number = req.query.number;

    if (!number) {
        return res.json({ code: "Number Missing" });
    }

    // Random 8-digit code generate (demo)
    const randomCode = Math.floor(10000000 + Math.random() * 90000000);

    res.json({ code: randomCode });
});

// server start
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
