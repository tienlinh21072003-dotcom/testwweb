import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>About Us</h1>
                <p>Welcome to Lisa Nail, where we prioritize your beauty and well-being. Our mission is to provide exceptional nail care services in a relaxing environment.</p>
                <h2>Our Values</h2>
                <ul>
                    <li>Quality: We use only the best products for our clients.</li>
                    <li>Customer Satisfaction: Your happiness is our top priority.</li>
                    <li>Innovation: We stay updated with the latest trends and techniques.</li>
                </ul>
                <h2>Our Mission</h2>
                <p>To enhance your beauty and confidence through our professional nail services.</p>
            </main>
            <Footer />
        </div>
    );
};

export default About;