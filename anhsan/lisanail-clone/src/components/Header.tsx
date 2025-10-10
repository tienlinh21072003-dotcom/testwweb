import React from 'react';
import './Header.css'; // Assuming you will create a Header.css for specific styles

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Lisa Nail</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;