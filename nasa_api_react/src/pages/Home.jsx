import Header from '../components/Header';
import Jumbotron from '../components/Jumbotron';
import AsteroidsCarousel from '../components/AsteroidsCarousel';

function Home() {
    return (
        <>
            <Header />
            <Jumbotron />
            <AsteroidsCarousel />
            <main className="container">
                <h1>Benvenuto nell'app NASA</h1>
                <p>Qui troverai l'immagine del giorno e molto altro!</p>
            </main>
        </>
    );
}

export default Home;