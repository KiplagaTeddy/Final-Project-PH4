import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS for styling
import Navbar from './Navbar';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />

      <section className="hero">
        <div className="hero-image">
          <h1 className="hero-heading">Empowering Youth Through Sports</h1>
        </div>
      </section>

      <section className="mission">
        <div className="mission-text">
          <h2>Our Mission:</h2>
          <p>
            We are dedicated to providing accessible sports programs for youth,
            fostering teamwork, discipline, and personal growth. Our goal is to
            create a positive impact in the lives of young athletes through
            inclusive and engaging sports activities.
          </p>
        </div>
      </section>

      <section className="cards">
        <div className='card'>
        <div className="card2">
          <h3>Enroll Now</h3>
          <p>
            Wait no more. Join us and foster your athletic journey today! Game on.
          </p>
          <Link to="/add-youth">
          <div className="container">
            <button className='btn'>Join Us</button>
            </div>
          </Link>
          </div>
        </div>
        <div className='card'>
        <div className="card2">
          <h3>What We Offer</h3>
          <p>
            Explore our wide range of sports programs and activities and fulfil your dreams.
          </p>
          <div className="container">
          <Link to="/Programs" className="button">
            <button className='btn'>Learn More</button>
          </Link>
          </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
