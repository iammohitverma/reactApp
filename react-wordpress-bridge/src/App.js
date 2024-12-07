import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// CSS VEndors
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/theme-style.css';

// Import All Pages
import Home from './inc/pages/HomePage';
import About from './inc/pages/AboutPage';
import Contact from './inc/pages/ContactPage';
import Services from './inc/pages/ServicesPage';
import NotFound from './inc/pages/NotFound';

function App() {
  return (
    <>
      <Router>
        <div>
          {/*  Create Slugs using Routes */}
          <Routes>
            <Route exact path="/" element={<Home pageName="Home Page"/>} />
            <Route path="/about" element={<About pageName="About Page"/>} />
            <Route path="/contact" element={<Contact pageName="Contact Page"/>} />
            <Route path="/services" element={<Services pageName="Services Page"/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
