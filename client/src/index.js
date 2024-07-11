import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust path as necessary
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
