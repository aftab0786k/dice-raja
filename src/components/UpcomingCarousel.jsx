


import React, { useState, useEffect } from "react";


const UpcomingCarouser = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "./1.jpg",
    "./1.jpg",
    "./1.jpg",
   
   
  ];

  // Shining animation keyframes (add to your CSS file)
  const shineAnimation = `
    @keyframes shine {
      0% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
      50% { box-shadow: 0 0 25px rgba(255, 255, 255, 0.9); }
      100% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
    }
  `;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg md:rounded-xl">
      <style>{shineAnimation}</style>
      
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full">
            <img
              src={img}
              alt={`Slide ${i + 1}`}
              className="w-full h-auto object-cover rounded-lg 
                       md:h-48 md:rounded-xl md:animate-shine"
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentIndex ? "bg-gray-700" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingCarouser;