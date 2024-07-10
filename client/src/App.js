import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProgramForm from './components/ProgramForm';
import YouthForm from './components/YouthForm';
import ProgramList from './components/ProgramList';
import YouthList from './components/YouthList';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/add-program" element={<ProgramForm />} />
          <Route path="/youths" element={<YouthList />} />
          <Route path="/add-youth" element={<YouthForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
