import React from 'react';
import './Footer.css'; // Assuming you have a separate CSS file for footer styles

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} Lisa Nail. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;