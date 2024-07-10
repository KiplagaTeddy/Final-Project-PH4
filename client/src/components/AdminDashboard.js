// src/components/AdminDashboard.js
import React from 'react';
import YouthForm from './YouthForm';
import ProgramForm from './ProgramForm';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <YouthForm />
      <ProgramForm />
    </div>
  );
}

export default AdminDashboard;
