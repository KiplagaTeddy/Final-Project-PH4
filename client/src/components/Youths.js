import React, { useEffect, useState } from 'react';
import '../styles/Youths.css';
import Navbar from './Navbar';


function Youths() {
  const [youths, setYouths] = useState([]);
  const [filteredYouths, setFilteredYouths] = useState([]);
  const [ageFilter, setAgeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  useEffect(() => {
    const fetchData = async () => {
      const updatedYouths = await Promise.all(
        youths.map(async youth => {
          const enrollmentDetails = await fetchEnrollmentDetails(youth.id);
          return { ...youth, enrollmentDetails };
        })
      );
      setFilteredYouths(updatedYouths);
    };

    fetchData();
  }, [youths]); // Dependency array to rerun effect when youths change

  const fetchEnrollmentDetails = async (youthId) => {
    try {
      const response = await fetch(`http://localhost:5555/enrollment_details?youth_id=${youthId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const enrollmentDetails = await response.json();
      return enrollmentDetails;
    } catch (error) {
      console.error(`Error fetching enrollment details for youth ${youthId}:`, error);
      return { enrollment_date: null, game_name: null }; // Return default values or handle error
    }
  };

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
            <p><strong>Email: </strong>{youth.email}</p>
            <p><strong>Age:</strong> {youth.age} years</p>
            {/* <p>Enrollment Date: {youth.enrollmentDetails ? youth.enrollmentDetails.enrollment_date : '-'}</p>
            <p>Game: {youth.enrollmentDetails ? youth.enrollmentDetails.game_name : '-'}</p> */}
            <button onClick={() => handleDelete(youth.id)} className="delete">Delete Youth</button>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Youths;
