import React from 'react';
import '../styles/Reports.css'; // Import CSS for styling

function Reports() {
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <div className="report-list">
        <div className="report">
          <h2>Monthly Attendance Report</h2>
          <p>Display monthly attendance statistics here.</p>
        </div>
        <div className="report">
          <h2>Program Effectiveness Report</h2>
          <p>Provide insights into program effectiveness.</p>
        </div>
        {/* Add more reports as needed */}
      </div>
    </div>
  );
}

export default Reports;
