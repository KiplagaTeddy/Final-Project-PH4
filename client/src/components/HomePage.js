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
        <div className="mission-image">
          <img
            src=".//home-page1.jpeg"
            alt="Youth playing sports"
            className="mission-img"
          />
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <h3>Enroll Now</h3>
          <p>
            Join our sports programs and start your athletic journey today!
          </p>
          <Link to="/add-youth" className="btn btn-green">
            Enroll
          </Link>
        </div>
        <div className="card">
          <h3>What We Offer</h3>
          <p>
            Explore our wide range of sports programs and activities.
          </p>
          <Link to="/Programs" className="btn btn-green">
            Learn More
          </Link>
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
