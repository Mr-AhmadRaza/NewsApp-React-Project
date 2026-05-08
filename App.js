import './App.css';

import React from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App =() => {
  
    return (
      <div>
        
        <Router>
          <Navbar />

         <Routes>
  <Route path="/home" element={<News key="Home" pageSize={5} country="us" category="Home" />} />

  <Route path="/about" element={<News key="About" pageSize={5} country="us" category="About" />} />

  <Route path="/business" element={<News key="Business" pageSize={5} country="us" category="Business" />} />

  <Route path="/entertainment" element={<News key="Entertainment" pageSize={5} country="us" category="Entertainment" />} />

  <Route path="/general" element={<News key="General" pageSize={5} country="us" category="General" />} />

  <Route path="/health" element={<News key="Health" pageSize={5} country="us" category="Health" />} />

  <Route path="/science" element={<News key="Science" pageSize={5} country="us" category="Science" />} />

  <Route path="/sport" element={<News key="Sport" pageSize={5} country="us" category="Sport" />} />
</Routes>


        </Router>
      </div>
    );
  }


export default App