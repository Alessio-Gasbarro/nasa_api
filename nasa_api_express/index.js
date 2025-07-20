const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Rotta esempio: Astronomy Picture of the Day (APOD)
app.get("/api/apod", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Errore nella richiesta APOD:", error.message);
        res.status(500).json({ error: "Errore nella richiesta alla NASA API" });
    }
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`✅ Server attivo su http://localhost:${PORT}`);
});