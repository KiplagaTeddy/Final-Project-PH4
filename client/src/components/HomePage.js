import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <h1>Youth Sports</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/programs">Programs</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <section className="hero">
        <div className="hero-image">
          <h1>Empowering Youth Through Sports</h1>
        </div>
      </section>

      <section className="mission">
        <div className="mission-text">
          <h2>Our Mission:</h2>
          <p>We are dedicated to providing accessible sports programs for youth, fostering teamwork, discipline, and personal growth. Our goal is to create a positive impact in the lives of young athletes through inclusive and engaging sports activities.</p>
        </div>
        <div className="mission-image">
          <img src="../background1.jpg" alt="Youth playing sports" />
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <h3>Enroll Now</h3>
          <p>Join our sports programs and start your athletic journey today!</p>
          <Link to="/add-youth" className="btn btn-green">Enroll</Link>
        </div>
        <div className="card">
          <h3>What We Offer</h3>
          <p>Explore our wide range of sports programs and activities.</p>
          <Link to="/Programs" className="btn btn-green">Learn More</Link>
        </div>
      </section>

      <footer className="footer bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2024 YouthSports. All rights reserved.</p>
          <div className="mt-4">
            <a href="https://github.com/KiplagaTeddy/Final-Project-PH4" className="text-blue-400 hover:text-blue-300 mx-2">Privacy Policy</a>
            <a href="https://github.com/KiplagaTeddy/Final-Project-PH4" className="text-blue-400 hover:text-blue-300 mx-2">Terms of Service</a>
            <a href="https://github.com/KiplagaTeddy/Final-Project-PH4" className="text-blue-400 hover:text-blue-300 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
