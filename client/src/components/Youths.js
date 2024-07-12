// src/components/Youths.js
import React, { useEffect, useState } from 'react';
import '../styles/Youths.css';
import api from '../api';

function Youths() {
  const [youths, setYouths] = useState([]);

  useEffect(() => {
    api.get('/youths')
      .then(response => setYouths(response.data))
      .catch(error => console.error('Error fetching youths:', error));
  }, []);

  return (
    <div className="youths-page">
      <h1>Youths Registered</h1>
      <div className="youths-list">
        {youths.map(youth => (
          <div key={youth.id} className="youth-card">
            <h2>{youth.name}</h2>
            <p>Enrolled in: {youth.program}</p>
            <p>Patron: {youth.patron}</p>
            <p>Enrollment Date: {youth.enrollment_date}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Youths;
