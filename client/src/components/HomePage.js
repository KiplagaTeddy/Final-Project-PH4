import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS for styling
import Navbar from './Navbar';


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
            Join our sports programs and start your athletic journey today!
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
            Explore our wide range of sports programs and activities.
          </p>
          <div className="container">
          <Link to="/Programs" className="button">
            <button className='btn'>Learn More</button>
          </Link>
          </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container mx-auto">
          <p>© 2024 YouthSports. All rights reserved.</p>
          <div className="mt-4">
            <a
              href="https://github.com/KiplagaTeddy/Final-Project-PH4"
              className="footer-link"
            >
              Privacy Policy
            </a>
            <a
              href="https://github.com/KiplagaTeddy/Final-Project-PH4"
              className="footer-link"
            >
              Terms of Service
            </a>
            <a
              href="https://github.com/KiplagaTeddy/Final-Project-PH4"
              className="footer-link"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
