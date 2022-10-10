import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import pages
import Error from './pages/Error';
import Home from './pages/Home';
import SingleArtist from './pages/SingleArtist';
// import components

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:id" element={<SingleArtist />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
