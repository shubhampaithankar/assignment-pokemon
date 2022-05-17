import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Pokemon from './pages/Pokemon/Pokemon';
import Trainer from './pages/Trainer/Trainer';

function App() {
  return (
    <Router>
    {/* Common Navbar Component */}
      <Navbar />
    {/* Common Sidebar Component */}
      <Sidebar />
      <Routes>
        <Route path='/pokemon' element={<Pokemon />} />
        <Route path='/trainer' element={<Trainer />} />        
      </Routes>
    </Router>
  )
}

export default App;
