import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PatronForm.css'; // Import CSS for styling
import Navbar from './Navbar';
import Footer from './Footer';

axios.defaults.baseURL = 'http://localhost:5555';

const PatronForm = () => {
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
    id: '',
    name: '',
    email: '',
    phone: '',
    game_id: '',
    game_id_2: '',
  });

  const [formErrors, setFormErrors] = useState({
    game_id: '',
    game_id_2: '',
  });

  useEffect(() => {
    // Optionally, fetch initial data or set up the component
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

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

    if (formErrors.game_id || formErrors.game_id_2) {
      console.error('Form has errors. Cannot submit.');
      return;
    }

    if (!formData.game_id) {
      setFormErrors({
        ...formErrors,
        game_id: 'Game 1 is required.'
      });
      return;
    }

    if (formData.id) {
      axios.put(`/patrons/${formData.id}`, formData)
        .then(response => {
          console.log('Patron updated:', response.data);
          const patronGameDetailsData = {
            patron_id: formData.id,
            game_id: formData.game_id,
            game_id_2: formData.game_id_2
          };

          axios.put('/patron_game_details', patronGameDetailsData)
            .then(patronGameDetailsResponse => {
              console.log('Patron game details updated:', patronGameDetailsResponse.data);
            })
            .catch(patronGameDetailsError => {
              console.error('Error updating patron game details:', patronGameDetailsError);
            });
        }).catch(error => {
          console.error('There was an error updating the patron!', error);
        });
    } else {
      axios.post('/patrons', formData)
        .then(response => {
          console.log('Patron created:', response.data);
          setFormData({
            name: '',
            email: '',
            phone: '',
            game_id: '',
            game_id_2: ''
          });

          const patronGameDetailsData = {
            patron_id: response.data.id,
            game_id: formData.game_id,
            game_id_2: formData.game_id_2
          };

          axios.post('/patron_game_details', patronGameDetailsData)
            .then(patronGameDetailsResponse => {
              console.log('Patron game details created:', patronGameDetailsResponse.data);
            })
            .catch(patronGameDetailsError => {
              console.error('Error creating patron game details:', patronGameDetailsError);
            });
        }).catch(error => {
          console.error('There was an error creating the patron!', error);
        });
    }
  };

  const handleEditClick = (patron) => {
    setFormData({
      id: patron.id,
      name: patron.name,
      email: patron.email,
      phone: patron.phone,
      game_id: patron.game_id, // Assuming these fields exist in your patron data
      game_id_2: patron.game_id_2
    });

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  return (
    <div className="patron-form-container">
      <Navbar />
      <main>
        <form className="patron-form" onSubmit={handleSubmit}>
          <h2>Register Patron</h2>
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
              placeholder='Email Address' 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            <input 
              placeholder='Phone Number' 
              type="tel" 
              name="phone" 
              value={formData.phone} 
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
                .filter(game => game.id !== formData.game_id) 
                .map(game => (
                  <option key={game.id} value={game.id}>{game.name}</option>
              ))}
            </select>
            {formErrors.game_id_2 && <span className="error-message">{formErrors.game_id_2}</span>}
          </label>
          <button type="submit">{formData.id ? 'Update Patron' : 'Register Patron'}</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default PatronForm;
