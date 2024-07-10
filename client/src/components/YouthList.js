import React, { useState, useEffect } from 'react';
import YouthForm from './YouthForm';

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
    <div>
      <h2>Youths List</h2>
      <button onClick={toggleFormVisibility}>
        {formVisible ? 'Hide Form' : 'Add Youth'}
      </button>
      {formVisible && <YouthForm />}
      <ul>
        {youths.map(youth => (
          <li key={youth.id}>{youth.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default YouthList;
