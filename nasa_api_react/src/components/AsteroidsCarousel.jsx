import { useEffect, useState } from "react";

function AsteroidsCarousel() {
    const [asteroids, setAsteroids] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/asteroids")
            .then((res) => res.json())
            .then((data) => setAsteroids(data))
            .catch((err) => console.error("Errore fetch asteroidi:", err));
    }, []);

    if (asteroids.length === 0) return <p>Loading asteroids...</p>;

    // Per loop infinito, duplico la lista (scroll continuo)
    const duplicated = [...asteroids, ...asteroids];

    return (
        <div className="carousel-wrapper">
            <div className="carousel-track">
                {duplicated.map((asteroid, index) => (
                    <div className="asteroid-card" key={`${asteroid.id}-${index}`}>
                        {/* L’API non fornisce immagini, quindi mettiamo un placeholder */}
                        <div className="asteroid-image-placeholder">☄️</div>
                        <h3>{asteroid.name}</h3>
                        <p>
                            Diametro: {asteroid.estimated_diameter_min} - {asteroid.estimated_diameter_max} km
                        </p>
                        <p>
                            {asteroid.is_potentially_hazardous_asteroid ? (
                                <span className="hazardous">⚠️ Pericoloso</span>
                            ) : (
                                <span>Sicuro</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AsteroidsCarousel;
