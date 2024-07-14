import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate('/horses');
  };

  const handleBrandClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={handleBrandClick}>HorsyHub</div>
      <button className="navbar-button" onClick={handleBookNowClick}>Book Now</button>
    </nav>
  );
};

export default Navbar;
