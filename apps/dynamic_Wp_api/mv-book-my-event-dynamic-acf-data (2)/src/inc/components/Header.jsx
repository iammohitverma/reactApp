import React, { useState, useEffect } from 'react';
import Logout from '../auth/LogOut';
import Register from '../auth/Register';
import { Link } from "react-router-dom";
function Header() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        
        const updateUserName = () => {
            console.log("Render updateUserName");
            const storedUserName = localStorage.getItem('UserName');
            setUserName(storedUserName || '');
        };
        updateUserName();
        window.addEventListener('userNameUpdated', updateUserName);
        return () => {
            window.removeEventListener('userNameUpdated', updateUserName);
        };
    }, []);
  return (
    <>
      <header>
        <div className="header_wrap">
            <div className="top_header">
                <div className="container">
                    <div className="top_header_wrap">
                        <div className="location">
                                  <a href="https://maps.app.goo.gl/fPyMRWFBbuqmb4iU8" target='_blank'> <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/locations.svg" alt="icon" />
                                      <span>Location</span></a>
                        </div>
                        <div className="social_icons">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/TechmindSoftwares/" target='_blank'> 
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/facebook.svg" alt="icon"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/techmindsoftwares/" target='_blank'>
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/instagram-filled.svg" alt="icon"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/techmindindia" target='_blank'>
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/twitter.svg" alt="icon"/>
                                    </a>    
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom_header">
                <div className="container">
                    <div className="bottom_header_wrap">
                        <div className="header_logo">
                                  <Link to="/">
                                      <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/header_logo.svg" alt="logo"/>
                            </Link>
                        </div>
                              <div class="header_menu">

                                  <ul>
                                      <li>
                                          <Link to="/" >Home</Link>
                                      </li>
                                      <li>
                                          <Link to="/events">Events</Link>
                                      </li>
                                      <li>
                                          <Link to="/blogs">Blogs</Link>
                                      </li>
                                      <li>
                                          <Link to="/contact" >Contact</Link>
                                      </li>
                                  </ul>

                              </div>
                        {/* <div className="header_search_bar">
                            <div className="search_bar_wrap">
                                <input type="search" name="search" id="search" placeholder="Search for events, activities etc."/>
                            </div>
                        </div> */}
                        <div className="header_button">
                            <div className="event_btn">
                                      <Link to={userName ? '/events' : '/login'} className="g-btn g-gradient-btn">{userName ? userName : 'Login'}</Link>
                            </div>
                            {/* <div className="admin_btn">
                                <a href="#" className="g-btn g-gradient-btn">
                                          <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/admin_icon.svg" alt="icon"/>
                                </a>
                            </div> */}
                                  <div className="admin_btn">
                                  {userName ? <Logout /> : <Register/>}
                                  </div>
                                  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    </>
  );
}

export default Header;
