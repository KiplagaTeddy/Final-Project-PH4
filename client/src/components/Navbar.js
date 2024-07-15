import React from 'react';
import { NavLink } from 'react-router-dom'; // Using NavLink for active link styling
import '../styles/Navbar.css'; // Import CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Vijana Sports System</h1>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/programs" activeClassName="active">
            Programs
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-youth" activeClassName="active">
            Enroll
          </NavLink>
        </li>
        <li>
          <NavLink to="/youths" activeClassName="active">
            Youth List
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
