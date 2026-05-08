import './App.css';

import React from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          {/* Default route */}
          <Route path="/" element={<News key="general" pageSize={5} country="pk" category="General" />} />

          <Route path="/business" element={<News key="business" pageSize={5} country="pk" category="Business" />} />

          <Route path="/entertainment" element={<News key="entertainment" pageSize={5} country="pk" category="Entertainment" />} />

          <Route path="/general" element={<News key="general" pageSize={5} country="pk" category="General" />} />

          <Route path="/health" element={<News key="health" pageSize={5} country="pk" category="Health" />} />

          <Route path="/science" element={<News key="science" pageSize={5} country="pk" category="Science" />} />

          <Route path="/sports" element={<News key="sports" pageSize={5} country="pk" category="Sports" />} />

          <Route path="/technology" element={<News key="technology" pageSize={5} country="pk" category="Technology" />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;