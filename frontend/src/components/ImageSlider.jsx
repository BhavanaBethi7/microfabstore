import React, { useState } from 'react';
import bg from '../assets/hero-bg.jpg'; // Adjust path if needed
import waferImg from '../assets/slider1.jpeg';
import transistorImg from '../assets/slider2.jpg';
import diodeImg from '../assets/slider3.jpeg';

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [waferImg, transistorImg, diodeImg];

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '50%',
          margin: '0 auto',
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        />
        <button
          onClick={goToPrev}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '50%',
            fontSize: '20px',
          }}
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '50%',
            fontSize: '20px',
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
