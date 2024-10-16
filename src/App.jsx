import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Features from "./sections/Features.jsx";
import Download from "./sections/Download.jsx";
import Footer from "./sections/Footer.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";

const App = () => {
  return (
    <Router>
      <main className="overflow-hidden">
        <Header />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Download />
              <Footer />
            </>
          } />

          {/* Booking page route */}
          <Route path="/booking" element={<SchedulePage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
