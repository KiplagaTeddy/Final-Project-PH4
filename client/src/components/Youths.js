import React, { useEffect, useState } from 'react';
import '../styles/Youths.css';
import Navbar from './Navbar';

function Youths() {
  const [youths, setYouths] = useState([]);
  const [filteredYouths, setFilteredYouths] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isEditing, setIsEditing] = useState(false);
  const [currentYouth, setCurrentYouth] = useState({ id: null, name: '', email: '', age: '' });

  useEffect(() => {
    fetch('http://localhost:5555/youths')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setYouths(data);
        setFilteredYouths(data);
      })
      .catch(error => console.error('Error fetching youths:', error));
  }, []);

  const handleDelete = (id) => {
    console.log(`Attempting to delete youth with id: ${id}`);
    fetch(`http://localhost:5555/youths/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      console.log('Response from server:', response);
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error}`);
        });
      }
      return response.json();
    })
    .then(() => {
      const updatedYouths = youths.filter(youth => youth.id !== id);
      setYouths(updatedYouths);
      setFilteredYouths(updatedYouths);
      console.log(`Youth with id ${id} deleted successfully`);
    })
    .catch(error => {
      console.error('Error deleting youth:', error);
      alert(`Error deleting youth: ${error.message}`);
    });
  };

  const handleFilter = () => {
    if (ageFilter === '') {
      setFilteredYouths(youths);
    } else {
      const filtered = youths.filter(youth => youth.age.toString() === ageFilter);
      setFilteredYouths(filtered);
    }
  };

  const handleSort = () => {
    const sortedYouths = [...filteredYouths].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    setFilteredYouths(sortedYouths);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleEdit = (youth) => {
    setCurrentYouth(youth);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentYouth(prevYouth => ({ ...prevYouth, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5555/youths/${currentYouth.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentYouth)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(updatedYouth => {
      const updatedYouths = youths.map(youth => 
        youth.id === updatedYouth.id ? updatedYouth : youth
      );
      setYouths(updatedYouths);
      setFilteredYouths(updatedYouths);
      setIsEditing(false);
      console.log(`Youth with id ${updatedYouth.id} updated successfully`);
    })
    .catch(error => {
      console.error('Error updating youth:', error);
      alert(`Error updating youth: ${error.message}`);
    });
  };

  return (
    <div className="youths-page">
      <Navbar />
      <h1>Youths Registered</h1>
      <div className="filter-container">
        <input
          type="number"
          placeholder="Filter by age"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
        />
        <button onClick={handleFilter} className="filter">Filter</button>
        <button onClick={handleSort} className="sort">
          {sortOrder === 'asc' ? 'Sort by Age Ascending' : 'Sort by Age Descending'}
        </button>
      </div>
      <div className="youths-list">
        {filteredYouths.map(youth => (
          <div key={youth.id} className="youth-card">
            <h2>{youth.name}</h2>
            <p>Email: {youth.email}</p>
            <p>Age: {youth.age}</p>
            <button onClick={() => handleEdit(youth)} className="edit">Edit Youth</button>
            <button onClick={() => handleDelete(youth.id)} className="delete">Delete Youth</button>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="edit-form">
          <h2>Edit Youth</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={currentYouth.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={currentYouth.email}
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={currentYouth.age}
              onChange={handleChange}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Youths;
