import React from 'react';
// import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
        <h1>Vijana Sports</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/programs">Programs</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/add-youth">Enroll</a></li>
        </ul>
      </nav>
  );
}

export default Navbar;
