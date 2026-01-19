import { Link } from "react-router-dom";

const NavLinks = () => {
    return (
        <div>
            <div className='nav-links'>
                <ul className='nav-links-list'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><a href="/register">Register</a></li>
                </ul>
            </div>
        </div>
    )
}

export default NavLinks;