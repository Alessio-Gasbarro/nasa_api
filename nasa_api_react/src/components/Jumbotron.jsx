import { useEffect, useState } from "react";

function Jumbotron() {
    const [apod, setApod] = useState(null);
    const text = "Astronomy Picture of the Day";

    const [visibleCount, setVisibleCount] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/apod")
            .then((res) => res.json())
            .then((data) => setApod(data))
            .catch((err) => console.error("Errore nel fetch APOD:", err));
    }, []);

    useEffect(() => {
        let timeout;
        if (fadeIn) {
            if (visibleCount < text.length) {
                timeout = setTimeout(() => setVisibleCount(visibleCount + 1), 100);
            } else {
                // Pausa 1.5s con tutta la scritta visibile
                timeout = setTimeout(() => setFadeIn(false), 1500);
            }
        } else {
            if (visibleCount > 0) {
                timeout = setTimeout(() => setVisibleCount(visibleCount - 1), 100);
            } else {
                // Pausa 0.5s con scritta sparita
                timeout = setTimeout(() => setFadeIn(true), 500);
            }
        }
        return () => clearTimeout(timeout);
    }, [visibleCount, fadeIn, text.length]);

    if (!apod || apod.media_type !== "image") return null;

    return (
        <div
            className="jumbotron"
            style={{
                backgroundImage: `url(${apod.hdurl})`,
            }}
        >
            <h1 className="animated-title">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className={`animated-letter ${index < visibleCount ? "" : "hidden"}`}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h1>
        </div>
    );
}

export default Jumbotron;