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

// Nuova rotta: Asteroidi vicini alla Terra (NEO Feed)
app.get("/api/asteroids", async (req, res) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const start_date = `${yyyy}-${mm}-${dd}`;

    // Data 7 giorni dopo
    const end = new Date(today);
    end.setDate(end.getDate() + 7);
    const yyyy2 = end.getFullYear();
    const mm2 = String(end.getMonth() + 1).padStart(2, "0");
    const dd2 = String(end.getDate()).padStart(2, "0");
    const end_date = `${yyyy2}-${mm2}-${dd2}`;

    try {
        const response = await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`
        );
        const data = response.data;

        // Estrarre e appiattire i NEO
        let asteroids = [];
        for (let date in data.near_earth_objects) {
            asteroids = asteroids.concat(data.near_earth_objects[date]);
        }

        // Prendere solo i primi 20
        asteroids = asteroids.slice(0, 20);

        // Mappare i dati necessari
        const filtered = asteroids.map(a => ({
            id: a.id,
            name: a.name,
            estimated_diameter_min: a.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3),
            estimated_diameter_max: a.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3),
            is_potentially_hazardous_asteroid: a.is_potentially_hazardous_asteroid,
        }));

        res.json(filtered);
    } catch (error) {
        console.error("Errore nella richiesta Asteroidi:", error.message);
        res.status(500).json({ error: "Errore nella richiesta alla NASA API" });
    }
});

// Nuova rotta: Satellite Launches (The Space Devs API)
app.get("/api/launches", async (req, res) => {
    try {
        const response = await axios.get(
            "https://llapi.thespacedevs.com/2.2.0/launch/upcoming/?limit=20"
        );
        res.json(response.data);
    } catch (error) {
        console.error("Errore nella richiesta Launches:", error.message);
        res.status(500).json({ error: "Errore nella richiesta dati lanci" });
    }
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`✅ Server attivo su http://localhost:${PORT}`);
});