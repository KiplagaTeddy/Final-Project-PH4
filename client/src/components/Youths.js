import React, { useEffect, useState } from 'react';
import '../styles/Youths.css';

function Youths() {
  const [youths, setYouths] = useState([]);
  const [filteredYouths, setFilteredYouths] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    fetch('/youths')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setYouths(data);
        setFilteredYouths(data); // Initialize filteredYouths with all youths
      })
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
        const updatedYouths = youths.filter(youth => youth.id !== id);
        setYouths(updatedYouths);
        setFilteredYouths(updatedYouths);
      })
      .catch(error => console.error('Error deleting youth:', error));
  };

  const handleFilter = () => {
    const filtered = youths.filter(youth => youth.age.toString() === ageFilter);
    setFilteredYouths(filtered);
  };

  return (
    <div className="youths-page">
      <h1>Youths Registered</h1>
      <div className="filter-container">
        <input
          type="number"
          placeholder="Filter by age"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
        />
        <button onClick={handleFilter} className="filter">Filter</button>
      </div>
      <div className="youths-list">
        {filteredYouths.map(youth => (
          <div key={youth.id} className="youth-card">
            <h2>{youth.name}</h2>
            <p>Email: {youth.email}</p>
            <p>Age: {youth.age}</p>
            <p>Enrolled in: {youth.game_id}</p>
            <p>Patron: {youth.patron_id}</p>
            <button onClick={() => handleDelete(youth.id)} className="delete">Delete Youth</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Youths;
