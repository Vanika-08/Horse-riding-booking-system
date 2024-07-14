import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSection.css';
import CarouselComponent from './Carousel';

const MainSection = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate('/horses');
  };

  return (
    <div className="main-section">
      <div className="left-content">
        <h1>Welcome to HorsyHub</h1>
        <h5>Discover and book horse rides with ease.</h5>
        <button className="book-now-button" onClick={handleBookNowClick}>Book Now</button>
      </div>
      <div className="right-content">
        <CarouselComponent />
      </div>
    </div>
  );
};

export default MainSection;
