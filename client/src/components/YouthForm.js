import React, { useState } from 'react';
import axios from 'axios';
import '../styles/YouthForm.css';
import Navbar from './Navbar';
import Footer from './Footer';

axios.defaults.baseURL = 'http://localhost:5555';

const Notification = ({ message, type }) => (
  <div className={`notification ${type} ${message ? 'show' : ''}`}>
    {message}
  </div>
);

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
    game_id_2: '',
  });

  const [formErrors, setFormErrors] = useState({
    age: '',
    game_id: '',
    game_id_2: '',
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [formVisible, setFormVisible] = useState(true); // State variable to control form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate fields
    if (name === 'age') {
      const ageValue = parseInt(value, 10);
      if (isNaN(ageValue) || ageValue < 12 || ageValue > 29) {
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

    if (name === 'game_id') {
      if (value === formData.game_id_2) {
        setFormErrors({
          ...formErrors,
          game_id: 'Please select a different game for Game 1.'
        });
      } else {
        setFormErrors({
          ...formErrors,
          game_id: ''
        });
      }
    }

    if (name === 'game_id_2') {
      if (value === formData.game_id) {
        setFormErrors({
          ...formErrors,
          game_id_2: 'Please select a different game for Game 2.'
        });
      } else {
        setFormErrors({
          ...formErrors,
          game_id_2: ''
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (formErrors.age || formErrors.game_id || formErrors.game_id_2) {
      console.error('Form has errors. Cannot submit.');
      setNotification({ show: true, message: 'Please correct the errors in the form.', type: 'error' });
      return;
    }

    // Check if at least one game is selected
    if (!formData.game_id) {
      setFormErrors({
        ...formErrors,
        game_id: 'Game 1 is required.'
      });
      setNotification({ show: true, message: 'Please select at least one game.', type: 'error' });
      return;
    }

    // Prepare data for submission
    const submissionData = {
      ...formData,
      age: parseInt(formData.age, 10),
      game_id: parseInt(formData.game_id, 10),
      game_id_2: formData.game_id_2 ? parseInt(formData.game_id_2, 10) : null
    };

    // Post request to create youth
    axios.post('/youths', submissionData)
      .then(response => {
        console.log('Youth created:', response.data);
        // Clear the form after youth creation
        setFormData({
          name: '',
          age: '',
          email: '',
          game_id: '',
          game_id_2: ''
        });

        // Show success notification
        setNotification({ show: true, message: 'Registration successful', type: 'success' });

        // Hide notification after 5 seconds
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 700000);

        // Hide the form after successful registration
        setFormVisible(false);

        // Post request to create enrollment
        const enrollmentData = {
          youth_id: response.data.id, 
          game_id: submissionData.game_id
        };

        return axios.post('/enrollments', enrollmentData);
      })
      .then(enrollmentResponse => {
        console.log('Enrollment created:', enrollmentResponse.data);
        if (submissionData.game_id_2) {
          const enrollmentData2 = {
            youth_id: enrollmentResponse.data.youth_id,
            game_id: submissionData.game_id_2
          };

          return axios.post('/enrollments', enrollmentData2);
        }
      })
      .then(enrollmentResponse2 => {
        if (enrollmentResponse2) {
          console.log('Second enrollment created:', enrollmentResponse2.data);
        }
      })
      .catch(error => {
        console.error('There was an error creating the youth!', error);
        setNotification({ show: true, message: 'An error occurred during registration. Please try again.', type: 'error' });
      });
  };

  return (
    <div className="youth-form-container">
      <Navbar />
      <main>
        {notification.show && <Notification message={notification.message} type={notification.type} />}
        {formVisible && (
          <form className="youth-form" onSubmit={handleSubmit}>
            <h2>Register Youth</h2>
            <label>
              <input 
                placeholder='Full Name' 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              <input 
                placeholder='Age' 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                required 
              />
              {formErrors.age && <span className="error-message">{formErrors.age}</span>}
            </label>
            <label>
              <input 
                placeholder='Email Address' 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              <select 
                name="game_id" 
                value={formData.game_id} 
                onChange={handleChange} 
                required
              >
                <option value="">Select game 1 (required)</option>
                {games.map(game => (
                  <option key={game.id} value={game.id}>{game.name}</option>
                ))}
              </select>
              {formErrors.game_id && <span className="error-message">{formErrors.game_id}</span>}
            </label>
            <label>
              <select 
                name="game_id_2" 
                value={formData.game_id_2} 
                onChange={handleChange}
              >
                <option value="">Select game 2 (optional)</option>
                {games
                  .filter(game => game.id !== parseInt(formData.game_id)) // Exclude selected game 1
                  .map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))
                }
              </select>
              {formErrors.game_id_2 && <span className="error-message">{formErrors.game_id_2}</span>}
            </label>
            <button type="submit">Register</button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default YouthForm;
