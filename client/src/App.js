import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Programs from './components/Programs';
import Youths from './components/Youths';
import NotFound from './components/NotFound';
import About from './components/About';
import YouthForm from './components/YouthForm';
import Enrollments from './components/Enrollments';
import Patrons from './components/Patrons'; // Import Patrons component
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Add the Navbar here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/youths" element={<Youths />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-youth" element={<YouthForm />} />
          <Route path="/enrollments" element={<Enrollments />} />
          <Route path="/patrons" element={<Patrons />} /> {/* Add the Patrons route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
