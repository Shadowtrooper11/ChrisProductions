import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="logo">
                    <img src="./hero.png" alt="Logo" />
                </div>
                <span className="name">Chris Productions</span>
            </div>

            <div className="nav-right">
                <Link to="/">Home</Link>
                <Link to="/music">Music</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    )
}

export default Navbar