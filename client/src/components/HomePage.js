import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS for styling
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar></Navbar>
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
          <p>Join our sports programs and start your athletic journey today! Whether you're passionate about football, rugby, basketball, baseball, tennis, golf, swimming, cricket, track and field, or volleyball, we offer a variety of engaging opportunities for youth of all ages and skill levels. Our programs are designed to foster teamwork, skill development, and a love for sports in a supportive and inclusive environment. Discover new talents, make lifelong friends, and embrace the thrill of competition while learning valuable lessons in sportsmanship and perseverance. Take the first step towards a healthier and more active lifestyle with our diverse range of athletic offerings. Join us and unleash your potential on the field, court, or track today!</p>
          <Link to="/add-youth" className="btn btn-green">Enroll</Link>
        </div>
        <div className="card">
          <h3>What We Offer</h3>
          <p>Explore our wide range of sports programs and activities. From the adrenaline rush of football and rugby to the strategic play of basketball and baseball, there's something for every young athlete eager to excel. Dive into the grace of tennis and golf, or embrace the challenge of swimming, cricket, track and field, and volleyball. Our programs are designed to nurture skills, build confidence, and foster a passion for sportsmanship and teamwork. Whether you're a beginner or a seasoned player, discover endless opportunities to grow, compete, and succeed in our dynamic youth sports community. Join us and ignite your passion for sports today!</p>
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
