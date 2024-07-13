// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Programs from './components/Programs';
import Youths from './components/Youths';
import Reports from './components/Reports';
import Login from './components/Login';
import NotFound from './components/NotFound';
import YouthForm from './components/YouthForm'; // Import YouthForm component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/youths" element={<Youths />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-youth" element={<YouthForm />} /> {/* New route for YouthForm */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
