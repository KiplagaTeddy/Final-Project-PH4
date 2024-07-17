import React, { useEffect, useState } from 'react';
import '../styles/Enrollments.css';
import Navbar from './Navbar';
import Footer from './Footer';

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
        // Group by youth ID and enrollment date
        const groupedData = data.reduce((acc, enrollment) => {
          const key = `${enrollment.youth_id}_${enrollment.enrollment_date}`;
          if (!acc[key]) {
            acc[key] = {
              youth_name: enrollment.youth_name,
              youth_age: enrollment.youth_age,
              youth_email: enrollment.youth_email,
              enrollment_date: enrollment.enrollment_date,
              games: []
            };
          }
          acc[key].games.push(enrollment.game_name);
          return acc;
        }, {});

        setEnrollments(Object.values(groupedData));
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
    <div>
      <div className="enrollments-page">
        <Navbar />
        <h1>Enrollments</h1>
        <button onClick={handleSort} className="sort">
          {sortOrder === 'asc' ? 'Sort by Date Ascending' : 'Sort by Date Descending'}
        </button>
        <div className="enrollments-list">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment, index) => (
              <div key={index} className="enrollment-card">
                <h2>{enrollment.youth_name}</h2>
                <p>Age: {enrollment.youth_age}</p>
                <p>Email: {enrollment.youth_email}</p>
                {enrollment.games.length > 1 ? ( // for youth 16 games[5]
                  enrollment.games.map((game, idx) => (
                    <p key={idx}>{`Game ${idx + 1}: ${game}`}</p>
                  ))
                ) : (
                  <p>Game: {enrollment.games[0]}</p>
                )}
                <p>Enrollment Date: {enrollment.enrollment_date}</p>
              </div>
            ))
          ) : (
            <p>No enrollments available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Enrollments;
