import React, { useEffect, useState } from 'react';

function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/programs')
      .then(response => response.json())
      .then(data => setPrograms(data));
  }, []);

  return (
    <div>
      <h1>Programs</h1>
      <ul>
        {programs.map(program => (
          <li key={program.id}>{program.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Programs;
