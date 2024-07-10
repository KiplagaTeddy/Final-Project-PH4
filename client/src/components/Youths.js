// src/components/Youths.js
import React, { useEffect, useState } from 'react';

function Youths() {
  const [youths, setYouths] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/youths')
      .then(response => response.json())
      .then(data => setYouths(data));
  }, []);

  return (
    <div>
      <h1>Youths</h1>
      <ul>
        {youths.map(youth => (
          <li key={youth.id}>{youth.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Youths;
