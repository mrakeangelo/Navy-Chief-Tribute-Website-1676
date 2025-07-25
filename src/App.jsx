import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './pages/Hero';
import Timeline from './pages/Timeline';
import Gallery from './pages/Gallery';
import Messages from './pages/Messages';
import TimeCapsule from './pages/TimeCapsule';
import CurrentRole from './pages/CurrentRole';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={
            <>
              <Navigation />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/timeline" element={<Timeline />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/time-capsule" element={<TimeCapsule />} />
                  <Route path="/current-role" element={<CurrentRole />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;