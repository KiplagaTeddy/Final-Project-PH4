import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Patrons.css';
import PatronCard from './PatronCard';
import Footer from './Footer';

const Patrons = () => {
  const [patrons, setPatrons] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    game_id: '',
    game_id_2: ''
  });

  const [formErrors, setFormErrors] = useState({
    game_id: '',
    game_id_2: '',
  });

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

  useEffect(() => {
    fetchPatrons();
  }, []);

  const fetchPatrons = async () => {
    try {
      const response = await axios.get('/patrons');
      setPatrons(response.data);
    } catch (error) {
      console.error('There was an error fetching the patrons!', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'game_id') {
      if (value === form.game_id_2) {
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
      if (value === form.game_id) {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formErrors.game_id || formErrors.game_id_2) {
      console.error('Form has errors. Cannot submit.');
      return;
    }

    if (!form.game_id) {
      setFormErrors({
        ...formErrors,
        game_id: 'Game 1 is required.'
      });
      return;
    }

    try {
      let patronResponse;
      if (form.id) {
        // Update existing patron
        await axios.put(`/patrons/${form.id}`, {
          name: form.name,
          email: form.email,
          phone_number: form.phone_number,
        });
        patronResponse = { data: { id: form.id } }; 
        console.log('Patron updated:', form);
      } else {
        // Create new patron
        patronResponse = await axios.post('/patrons', {
          name: form.name,
          email: form.email,
          phone_number: form.phone_number,
        });
        console.log('Patron created:', patronResponse.data);
      }

      const patronId = patronResponse.data.id;

      // Construct the game details
      const gameDetails = [
        {
          patron_id: patronId,
          game_id: form.game_id,
          game_name: games.find(game => game.id === parseInt(form.game_id)).name,
          patron_name: form.name
        },
        ...(form.game_id_2 ? [{
          patron_id: patronId,
          game_id: form.game_id_2,
          game_name: games.find(game => game.id === parseInt(form.game_id_2)).name,
          patron_name: form.name
        }] : [])
      ];

      console.log('Sending game details:', gameDetails); // Debugging line

      // Send game details to the backend
      const gameDetailsPromises = gameDetails.map(details =>
        axios.post('/patron_game_details', details)
      );

      await Promise.all(gameDetailsPromises);
      console.log('Patron game details created:', gameDetails);

      setForm({
        id: '',
        name: '',
        email: '',
        phone_number: '',
        game_id: '',
        game_id_2: ''
      });

      fetchPatrons();
      // Scroll to the bottom of the page after form submission
      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      console.error('There was an error creating or updating the patron or game details!', error);
    }
  };

  const handleEditClick = (patron) => {
    setForm({
      id: patron.id,
      name: patron.name,
      email: patron.email,
      phone_number: patron.phone_number,
      game_id: patron.game_id,
      game_id_2: patron.game_id_2
    });
    // Scroll to the top of the page when editing a patron
    window.scrollTo(0, 0);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`/patrons/${id}`);
      if (response.status === 200) {
        fetchPatrons();
      } else {
        console.error('Failed to delete patron:', response.data);
      }
    } catch (error) {
      console.error('There was an error deleting the patron!', error);
    }
  };

  return (
    <div>
      <div className="patrons-page">
        <h1>Patrons</h1>
        <form onSubmit={handleFormSubmit} className="patrons-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={handleInputChange}
            required
          />
          <label>
            <select
              name="game_id"
              value={form.game_id}
              onChange={handleInputChange}
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
              value={form.game_id_2}
              onChange={handleInputChange}
            >
              <option value="">Select game 2 (optional)</option>
              {games
                .filter(game => game.id !== parseInt(form.game_id))
                .map(game => (
                  <option key={game.id} value={game.id}>{game.name}</option>
                ))
              }
            </select>
            {formErrors.game_id_2 && <span className="error-message">{formErrors.game_id_2}</span>}
          </label>
          <button type="submit">{form.id ? 'Update' : 'Create'} Patron</button>
        </form>
        <div className="patrons-list">
          {patrons.map(patron => (
            <PatronCard
              key={patron.id}
              patron={patron}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Patrons;
