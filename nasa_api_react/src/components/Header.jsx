import logo from '../assets/NASA_logo.svg.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="header-content">
                    <img src={logo} alt="NASA Logo" className="logo" />
                    <h1 className="title">NASA API PROJECT</h1>
                </Link>
            </div>
        </header>
    );
}

export default Header;