import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">Vijana Sports System</div>
        <nav className="navbar">
          <ul>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/youths">Youths</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Vijana Sports System</h1>
          <p>Streamline youth program management and enrichment.</p>
          <Link to="/programs" className="cta-button">Explore Programs</Link>
        </div>
        <div className="hero-image">
          {/* Illustration or image representing your application */}
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature">
            {/* Feature icon */}
            <h3>Program Management</h3>
            <p>Create, manage, and track youth programs with ease.</p>
          </div>
          <div className="feature">
            {/* Feature icon */}
            <h3>Youth Enrollment</h3>
            <p>Enable youths to explore and enroll in various programs.</p>
          </div>
          {/* Add more features as necessary */}
        </div>
      </section>

      <footer className="footer">
        <div className="contact-info">
          <p>Contact us: info@vijanasports.com</p>
          <p>Follow us: <a href="https://twitter.com/vijanasports">Twitter</a>, <a href="https://facebook.com/vijanasports">Facebook</a></p>
        </div>
        <div className="legal">
          <p><Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
