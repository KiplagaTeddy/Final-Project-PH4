import React, { useState } from 'react';
import axios from 'axios';
import '../styles/YouthForm.css'; // Import CSS for styling
import Navbar from './Navbar';

axios.defaults.baseURL = 'http://localhost:5555'; 

const YouthForm = () => {
  const games = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Rugby' },
    { id: 3, name: 'Basketball' },
    { id: 4, name: 'Baseball' },
    { id: 5, name: 'Tennis' },
    { id: 6, name: 'Golf' },
    { id: 7, name: 'Swimming' },
    { id: 8, name: 'Cricket' },
    { id: 9, name: 'Track and Field' },
    { id: 10, name: 'Volleyball' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    game_id: '',
  });

  const [formErrors, setFormErrors] = useState({
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate age field
    if (name === 'age') {
      if (value < 12 || value > 29) {
        setFormErrors({
          ...formErrors,
          age: 'Age must be between 12 and 29 years.'
        });
      } else {
        setFormErrors({
          ...formErrors,
          age: ''
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (formErrors.age) {
      console.error('Form has errors. Cannot submit.');
      return;
    }

    // Post request to create youth
    axios.post('/youths', formData)
      .then(response => {
        console.log('Youth created:', response.data);
        // Clear the form after youth creation
        setFormData({
          name: '',
          age: '',
          email: '',
          game_id: ''
        });

        // Post request to create enrollment
        const enrollmentData = {
          youth_id: response.data.id, 
          game_id: formData.game_id
        };

        axios.post('/enrollments', enrollmentData)
          .then(enrollmentResponse => {
            console.log('Enrollment created:', enrollmentResponse.data);
            // Optionally do something after successful enrollment creation
          })
          .catch(enrollmentError => {
            console.error('Error creating enrollment:', enrollmentError);
          });

      }).catch(error => {
        console.error('There was an error creating the youth!', error);
      });
  };

  return (
    <div className="youth-form-container">
      <Navbar />
      <main>
        <form className="youth-form" onSubmit={handleSubmit}>
          <h2>Register Youth</h2>
          <label>
            <input placeholder='Full Name' type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            <input placeholder='Age' type="number" name="age" value={formData.age} onChange={handleChange} required />
            {formErrors.age && <span className="error-message">{formErrors.age}</span>}
          </label>
          <label>
            <input placeholder='Email Address' type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            <select name="game_id" value={formData.game_id} onChange={handleChange} required>
              <option value="">Select a game</option>
              {games.map(game => (
                <option key={game.id} value={game.id}>{game.name}</option>
              ))}
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

export default YouthForm;
