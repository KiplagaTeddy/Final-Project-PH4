import React, { useEffect, useState } from 'react';
import '../styles/Enrollments.css';
import Navbar from './Navbar';

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('http://localhost:5555/enrollment_details')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEnrollments(data);
      })
      .catch(error => console.error('Error fetching enrollments:', error));
  }, []);

  const handleSort = () => {
    const sortedEnrollments = [...enrollments].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.enrollment_date) - new Date(b.enrollment_date);
      } else {
        return new Date(b.enrollment_date) - new Date(a.enrollment_date);
      }
    });
    setEnrollments(sortedEnrollments);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="enrollments-page">
      <Navbar />
      <h1>Enrollments</h1>
      <button onClick={handleSort} className="sort">
        {sortOrder === 'asc' ? 'Sort by Date Ascending' : 'Sort by Date Descending'}
      </button>
      <div className="enrollments-list">
        {enrollments.map(enrollment => (
          <div key={enrollment.enrollment_id} className="enrollment-card">
            <h2>{enrollment.youth_name}</h2>
            <p>Age: {enrollment.youth_age}</p>
            <p>Email: {enrollment.youth_email}</p>
            <p>Game: {enrollment.game_name}</p>
            <p>Enrollment Date: {enrollment.enrollment_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Enrollments;
