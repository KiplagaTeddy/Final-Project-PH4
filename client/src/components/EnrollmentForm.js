import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EnrollmentForm.css'; // Make sure the path to the CSS file is correct

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'patron', // Default to 'patron' role
    sport: '', // Only for patrons
  });

  const [sports, setSports] = useState([]);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    sport: ''
  });

  useEffect(() => {
    // Fetch sports options
    axios.get('/sports') // Assuming the endpoint is /sports
      .then(response => {
        setSports(response.data);
      })
      .catch(error => {
        console.error('Error fetching sports:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate form fields
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setFormErrors({
          ...formErrors,
          email: 'Invalid email address.'
        });
      } else {
        setFormErrors({
          ...formErrors,
          email: ''
        });
      }
    }

    if (name === 'phone') {
      const phonePattern = /^[0-9]{10}$/; // Example pattern for a 10-digit phone number
      if (!phonePattern.test(value)) {
        setFormErrors({
          ...formErrors,
          phone: 'Phone number must be 10 digits long.'
        });
      } else {
        setFormErrors({
          ...formErrors,
          phone: ''
        });
      }
    }

    if (name === 'sport') {
      if (value === '') {
        setFormErrors({
          ...formErrors,
          sport: 'Please select a sport.'
        });
      } else {
        setFormErrors({
          ...formErrors,
          sport: ''
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (formErrors.name || formErrors.email || formErrors.phone || formErrors.sport) {
      console.error('Form has errors. Cannot submit.');
      return;
    }

    const endpoint = formData.role === 'patron' ? '/patrons' : '/youths';
    axios.post(endpoint, formData)
      .then(response => {
        console.log(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} created:`, response.data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: 'patron', // Reset to 'patron' role after form submission
          sport: ''
        });
      })
      .catch(error => {
        console.error('There was an error creating the entity!', error);
      });
  };

  return (
    <div className="enrollment-form-container">
      <main>
        <form className="enrollment-form" onSubmit={handleSubmit}>
          <h2>Enroll as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</h2>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </label>
          <label>
            Phone Number
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
          </label>
          <label>
            Role
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="patron">Patron</option>
              <option value="youth">Youth</option>
            </select>
          </label>
          {formData.role === 'patron' && (
            <label>
              Sport
              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
              >
                <option value="">Select a Sport</option>
                {sports.map(sport => (
                  <option key={sport.id} value={sport.id}>{sport.name}</option>
                ))}
              </select>
              {formErrors.sport && <span className="error-message">{formErrors.sport}</span>}
            </label>
          )}
          <button type="submit">Submit</button>
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

export default EnrollmentForm;


