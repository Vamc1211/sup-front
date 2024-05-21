// App.js

import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/login';
import ManufacturerDashboard from './components/ManufacturerDashboard';
import TransporterDashboard from './components/TransporterDashboard';

function App() {
  return (
    <Router>
      <div className="App">
         <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/register" element={<Registration/>} />
          <Route exact path="/manufacturer/:id" element={<ManufacturerDashboard/>} />
          <Route exact path="/transporter/:id" element={<TransporterDashboard/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
