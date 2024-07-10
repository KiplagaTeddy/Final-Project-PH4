
import React, { useState, useEffect } from 'react';
import ProgramForm from './ProgramForm';
import '../styles/ProgramList.css'; // Import CSS file

function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetch('/api/programs')
      .then(response => response.json())
      .then(data => setPrograms(data))
      .catch(error => console.error('Error fetching programs:', error));
  }, []);

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="program-list-container">
      <h2 className="program-list-title">Programs List</h2>
      <button className="add-button" onClick={toggleFormVisibility}>
        {formVisible ? 'Hide Form' : 'Add Program'}
      </button>
      {formVisible && <ProgramForm />}
      <ul>
        {programs.map(program => (
          <li key={program.id} className="program-list-item">
            {program.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramList;
