const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// public folder میں HTML اور CSS serve کرنا
app.use(express.static(path.join(__dirname, "public")));

// /code API route — یہ number لے کر random 6-digit code دے گا
app.get("/code", async (req, res) => {
    const number = req.query.number;

    if (!number) {
        return res.json({ code: "Number Missing" });
    }

    // Demo کے لیے random 6-digit code
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    res.json({ code: randomCode });
});

// server start
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
