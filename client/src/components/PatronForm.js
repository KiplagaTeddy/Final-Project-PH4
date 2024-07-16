// src/components/PatronForm.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PatronForm.css';

axios.defaults.baseURL = 'http://localhost:5555';

const PatronForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/patrons', formData)
      .then(response => {
        console.log('Patron created:', response.data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: ''
        });
      })
      .catch(error => {
        console.error('There was an error creating the patron!', error);
      });
  };

  return (
    <div className="patron-form-container">
      <main>
        <form className="patron-form" onSubmit={handleSubmit}>
          <h2>Patron Registration</h2>
          <label>
            <input placeholder='Full Name' type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            <input placeholder='Email Address' type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            <input placeholder='Phone Number' type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select a Role</option>
              <option value="parent">Parent</option>
              <option value="guardian">Guardian</option>
            </select>
          </label>
          <button type="submit">Register</button>
        </form>
      </main>
      <footer>
        <p>© 2024 Youth Sports. All rights reserved.</p>
        <ul>
          <li><a href="https://github.com/KiplagaTeddy/Final-Project-PH4">Privacy Policy</a></li>
          <li><a href="https://github.com/KiplagaTeddy/Final-Project-PH4">Terms of Service</a></li>
          <li><a href="https://github.com/KiplagaTeddy/Final-Project-PH4">Contact Us</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default PatronForm;



