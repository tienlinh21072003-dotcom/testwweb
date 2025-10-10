import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceList from '../components/ServiceList';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Header />
            <main>
                <h1>Welcome to Lisa Nail</h1>
                <p>Your one-stop destination for all nail care services.</p>
                <ServiceList />
            </main>
            <Footer />
        </div>
    );
};

export default Home;