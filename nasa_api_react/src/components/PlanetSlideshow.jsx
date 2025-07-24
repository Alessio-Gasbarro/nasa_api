import { useEffect, useState } from "react";
import planetData from "../data/planetData";

function PlanetSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % planetData.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const fetched = await Promise.all(
                planetData.map(async (p) => {
                    try {
                        const res = await fetch(
                            `https://images-api.nasa.gov/search?q=${p.searchQuery}&media_type=image`
                        );
                        const json = await res.json();
                        return json.collection.items[0]?.links?.[0]?.href || "";
                    } catch {
                        return "";
                    }
                })
            );
            setImages(fetched);
        };
        fetchImages();
    }, []);

    const planet = planetData[currentIndex];
    const imgUrl = images[currentIndex];

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % planetData.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? planetData.length - 1 : prev - 1
        );
    };

    if (!imgUrl) return null;

    return (
        <div className="planet-container">
            <button className="arrow-button arrow-left" onClick={goPrev}>
                ❮
            </button>
            <div className="slideshow-section">
                <img
                    src={imgUrl}
                    alt={planet.name}
                    className="planet-image-fade"
                    key={planet.name}
                />
            </div>
            <div className="info-section">
                <h2>{planet.name}</h2>
                <ul className="planet-info-list">
                    <li><strong>Temperature:</strong> {planet.temperature}</li>
                    <li><strong>Mass:</strong> {planet.mass}</li>
                    <li><strong>Radius:</strong> {planet.radius}</li>
                    <li><strong>Gravity:</strong> {planet.gravity}</li>
                    <li><strong>Moons:</strong> {planet.moons}</li>
                    <li><strong>Orbit:</strong> {planet.orbit}</li>
                </ul>
            </div>
            <button className="arrow-button arrow-right" onClick={goNext}>
                ❯
            </button>
        </div>
    );
}

export default PlanetSlideshow;


