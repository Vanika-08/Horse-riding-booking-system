import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const CarouselComponent = () => {
  const horses = [
    { id: 1, name: 'Horse A', image: 'https://i.pinimg.com/736x/d2/a5/1e/d2a51e34dbf97a7eb6c7d13991314781.jpg' },
    { id: 2, name: 'Horse B', image: 'https://png.pngtree.com/thumb_back/fh260/background/20230706/pngtree-white-horse-in-full-stride-3d-rendered-image-image_3813279.jpg' },
    { id: 3, name: 'Horse C', image: 'https://wallpapers.com/images/hd/animal-horse-sunset-hd-wallpaper-background-image-04764o3hoba1zu4z.jpg' },
    { id: 4, name: 'Horse D', image: 'https://images.pexels.com/photos/1559388/pexels-photo-1559388.jpeg' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % horses.length;
      setCurrentSlide(nextSlide);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, horses.length]);

  return (
    <div className="carousel-wrapper">
      <Carousel showArrows={true} showThumbs={false} selectedItem={currentSlide} infiniteLoop autoPlay>
        {horses.map((horse) => (
          <div key={horse.id}>
            <img src={horse.image} alt={horse.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
