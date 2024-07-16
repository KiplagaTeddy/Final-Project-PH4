import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Enrollments.css';

function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    api.get('/enrollment_details')
      .then(response => setEnrollments(response.data))
      .catch(error => console.error('Error fetching enrollments:', error));
  }, []);

  return (
    <div className="enrollment-list-container">
      <h2>Enrollment List</h2>
      <ul className="enrollment-list">
        {enrollments.map(enrollment => (
          <li key={enrollment.enrollment_id} className="enrollment-item">
            <div>
              <strong>Youth Name:</strong> {enrollment.youth_name}
            </div>
            <div>
              <strong>Age:</strong> {enrollment.youth_age}
            </div>
            <div>
              <strong>Email:</strong> {enrollment.youth_email}
            </div>
            <div>
              <strong>Game:</strong> {enrollment.game_name}
            </div>
            <div>
              <strong>Enrollment Date:</strong> {enrollment.enrollment_date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnrollmentList;
