import React, { useState, useEffect } from 'react';
import YouthForm from './YouthForm';
import '../styles/Youths.css';

function YouthList() {
  const [youths, setYouths] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetch('/api/youths')
      .then(response => response.json())
      .then(data => setYouths(data))
      .catch(error => console.error('Error fetching youths:', error));
  }, []);

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="youth-list-container">
      <h2>Youths List</h2>
      <button onClick={toggleFormVisibility}>
        {formVisible ? 'Hide Form' : 'Add Youth'}
      </button>
      {formVisible && <YouthForm />}
      <ul className="youth-list">
        {youths.map(youth => (
          <li key={youth.id} className="youth-item">
            <div>
              <strong>Name:</strong> {youth.name}
            </div>
            <div>
              <strong>Age:</strong> {youth.age}
            </div>
            <div>
              <strong>Patron:</strong> {youth.patron ? youth.patron.name : 'Not Assigned'}
            </div>
            <div>
              <strong>Enrollment Date:</strong> {new Date(youth.enrollmentDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Game:</strong> {youth.game ? youth.game.name : 'Not Assigned'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YouthList;
