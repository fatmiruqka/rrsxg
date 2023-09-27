import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home';
import {
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';



const root = ReactDOM.createRoot(document.getElementById('root15'));
root.render(
  <React.StrictMode>
  <Router>
  <Routes> 
      <Route path="/welcome" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<App />} />
      
    </Routes>
    </Router>
  </React.StrictMode>
);
