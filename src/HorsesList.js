import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HorsesList.css';

const HorsesList = () => {
  const navigate = useNavigate();

  const handleBookNow = (horse) => {
    // Navigate to the booking form with the selected horse
    navigate('/booking', { state: { horse } });
  };

  const horses = [
    {
      name: "Warmbloods",
      origin: "Europe",
      description: "Known for their calm demeanor and excellent performance in dressage and jumping events.",
      imgSrc: "https://www.thesprucepets.com/thmb/zT0gXdf56p3gjGv-pjE93PxLDmM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-763481781-54b649b616d1435cbc883ccf802020ff.jpg"
    },
    {
      name: "American Quarter Horse",
      origin: "United States",
      description: "Versatile breed ideal for both Western and English riding disciplines.",
      imgSrc: "https://animalife.co.uk/wp-content/uploads/2021/07/QuarterHorse.jpg"
    },
    {
      name: "Andalusian horse",
      origin: "Spain",
      description: "Agile, elegant and graceful, perfect for classical dressage.",
      imgSrc: "https://animalife.co.uk/wp-content/uploads/2021/07/Andalusian.jpg"
    },
    {
      name: "Friesian",
      origin: "Netherlands",
      description: "Stunning appearance and gentle temperament, ideal for both driving and riding.",
      imgSrc: "https://animalife.co.uk/wp-content/uploads/2021/07/Friesian4-1.jpg"
    }
  ];

  return (
    <div className="horses-list">
      <h2>Choose a Horse</h2>
      <div className="horses-container">
        {horses.map(horse => (
          <div className="horse-card" key={horse.name}>
            <img src={horse.imgSrc} alt={horse.name} />
            <p><strong>{horse.name}</strong></p>
            <p><strong>Origin:</strong> {horse.origin}</p>

            <p>{horse.description}</p>
            <button onClick={() => handleBookNow(horse)} className="btn-primary">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorsesList;
