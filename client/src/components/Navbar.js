import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/programs">Programs</Link>
        </li>
        <li>
          <Link to="/add-program">Add Program</Link>
        </li>
        <li>
          <Link to="/youths">Youths</Link>
        </li>
        <li>
          <Link to="/add-youth">Add Youth</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
