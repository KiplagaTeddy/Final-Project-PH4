import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home'; // Adjust path as necessary
import ProgramsPage from './components/Programs'; // Adjust path as necessary
import YouthsPage from './components/Youths'; // Adjust path as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/youths" element={<YouthsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
