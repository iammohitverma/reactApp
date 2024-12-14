import React from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        localStorage.removeItem('UserName'); // Remove the token from localStorage
        window.dispatchEvent(new Event('userNameUpdated'));
        alert('You have been logged out!'); // Optional: Notify the user
        navigate('/login'); // Redirect to the login page
    };


    return <><a href="javascript:void(0)" onClick={handleLogout} className="g-btn g-gradient-btn"> Logout</a></>;
};


export default Logout;