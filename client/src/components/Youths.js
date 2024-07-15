import React, { useEffect, useState } from 'react';
import '../styles/Youths.css';
import Navbar from './Navbar';

function Youths() {
  const [youths, setYouths] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/youths')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setYouths(data))
      .catch(error => console.error('Error fetching youths:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5555/youths/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setYouths(youths.filter(youth => youth.id !== id));
      })
      .catch(error => console.error('Error deleting youth:', error));
  };

  return (
    <div className="youths-page">
      <Navbar></Navbar>
      <h1>Youths Registered</h1>
      <div className="youths-list">
        {youths.map(youth => (
          <div key={youth.id} className="youth-card">
            <h2>{youth.name}</h2>
            <p>Email: {youth.email}</p>
            <p>Age: {youth.age}</p>
            <p>Enrolled in: {youth.game_id}</p>
            <button onClick={() => handleDelete(youth.id)} className="delete">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Youths;
