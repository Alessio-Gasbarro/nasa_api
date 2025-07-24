import { useEffect, useState } from "react";

function SatelliteCarousel() {
    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/launches")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.results) {
                    setLaunches(data.results);
                }
            })
            .catch((err) => console.error("Errore nel fetch Launches:", err));
    }, []);

    if (!launches.length) return null;

    return (
        <div className="carousel-wrapper satellite">
            <div className="carousel-track satellite-track">
                {launches.map((launch) => (
                    <div className="asteroid-card" key={launch.id}>
                        <img
                            src={
                                launch.image ||
                                "https://via.placeholder.com/200x120?text=No+Image"
                            }
                            alt={launch.name}
                            style={{
                                width: "100%",
                                height: "120px",
                                borderRadius: "8px",
                                objectFit: "cover",
                                marginBottom: "0.5rem",
                            }}
                        />
                        <p>{launch.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SatelliteCarousel;