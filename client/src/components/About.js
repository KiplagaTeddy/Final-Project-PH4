import React from "react";
import Navbar from "./Navbar";
import '../styles/About.css';
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="about-page">
        <Navbar />
      
      <div className="about-container">
      
        <h2 className="about">About Us</h2>

      <p>
  <strong>Our Objective:</strong> Vijana Sports System is a full-stack web application designed to streamline youth program management. Using a Flask backend and a React frontend, the platform provides an intuitive experience for managing youth enrollments in various programs. The system facilitates easy communication between patrons, youths, and program administrators, enhancing the overall engagement and effectiveness of youth enrichment initiatives.
</p>
<br />
<p>
  <strong>Our Mission:</strong> Many youth programs struggle with inefficient systems for managing enrollments and scheduling activities. This can lead to administrative challenges, missed opportunities for program participation, and communication gaps between program providers and youth participants. Patrons overseeing these programs also face difficulties in organizing and tracking program activities effectively.
</p>
<br />
<p>
  <strong>Our Vission:</strong> Vijana Sports System aims to address these challenges by offering a modern, user-friendly platform that centralizes youth program management. The platform enables patrons to create and manage programs, track youth enrollments, and communicate effectively with program participants. For youths, it provides easy access to program details, schedules, and seamless enrollment options, fostering a more engaging and enriching experience.
</p>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
