import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// CSS VEndors
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/stylesheet.css';
import './assets/css/theme-style.css';

// Import All Pages
import Header from './inc/components/Header';
import Home from './inc/pages/HomePage';
import Events from './inc/pages/EventPage';
import EventDetail from './inc/singlePage/EventDetail';
import Blogs from './inc/pages/BlogPage';
import BlogDetail from './inc/singlePage/BlogDetail';
import Contact from './inc/pages/ContactPage';
import NotFound from './inc/pages/NotFound';
import Footer from './inc/components/Footer';

import ScrollToTop from "./inc/components/ScrollToTop";


// User Dashboard

import ProtectedRoute from './inc/auth/ProtectedRoute';
import Login from './inc/auth/Login';


function App() {
  const siteUrl = "https://bookmyevents.tmdemo.in/bme-admin/";
  return (
    <>
    
      <Router>
        <ScrollToTop />
        <Header/>
        <div>
          {/* <Routes>
            <Route exact path="/react_websites/book-my-event/" element={<Home />} />
            <Route path="/react_websites/book-my-event/events" element={<Events />} />
            <Route path="/react_websites/book-my-event/eventdetail" element={<EventDetail />} />
            <Route path="/react_websites/book-my-event/blogs" element={<Blogs />} />
            <Route path="/react_websites/book-my-event/blogdetail" element={<BlogDetail />} />
            <Route path="/react_websites/book-my-event/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes> */}
          <Routes>
            <Route exact path="/" element={<Home pageName="Home" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/events" element={<Events pageName="Events" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            {/* <Route path="/event/:slug" element={<EventDetail pageName="Event Details" siteUrl={siteUrl} flexibleContentId={"sections"}  />} /> */}
            <Route path="/blogs" element={<Blogs pageName="Blog" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/blog/:slug" element={<BlogDetail pageName="Blog Details" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/contact" element={<Contact pageName="Contact" siteUrl={siteUrl} flexibleContentId={"sections"}  />} />
            <Route path="/login" element={<Login siteUrl={siteUrl} />} />
            <Route
              path="/event/:slug"
              element={
                <ProtectedRoute>
                  <EventDetail pageName="Event Details" siteUrl={siteUrl} flexibleContentId={"sections"} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
