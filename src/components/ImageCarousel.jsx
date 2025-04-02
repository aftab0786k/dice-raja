import React, { useState, useEffect, useRef } from "react";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  const images = [
    "./s-ladder.jpg",
    "./ludooDice.jpg",
    "./ludooDice.jpg",
    "./ludooDice.jpg",
  ];

  // Premium gradient animation styles
  const carouselStyles = `
    @keyframes borderGlow {
      0% { box-shadow: 0 0 20px rgba(100, 210, 255, 0.5); }
      50% { box-shadow: 0 0 30px rgba(255, 100, 210, 0.6); }
      100% { box-shadow: 0 0 20px rgba(100, 210, 255, 0.5); }
    }
    
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .premium-carousel-border {
      position: relative;
      padding: 4px;
      border-radius: 16px;
      // background: linear-gradient(
      //   135deg,
      //   #64d2ff 0%,
      //   #a164ff 50%,
      //   #ff64c8 100%
      // );
      background-size: 200% 200%;
      // animation: gradientFlow 8s ease infinite, borderGlow 6s infinite;
      // box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      overflow: hidden;
    }
    
    .carousel-container {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 16/5; /* Further reduced height for a slimmer carousel */
    }
    
    .carousel-slides {
      display: flex;
      transition: transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      height: 100%;
    }
    
    .carousel-slide {
      min-width: 100%;
      position: relative;
    }
    
    .carousel-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .carousel-slide:hover .carousel-image {
      transform: scale(1.02);
    }
    
    .carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      z-index: 2;
    }
    
    .carousel-btn {
      background: rgba(0, 0, 0, 0.6);
      border: 2px solid rgba(255, 255, 255, 0.4);
      color: white;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: none; /* Removed blur effect */
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .carousel-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: #64d2ff;
      transform: scale(1.1);
    }
    
    .carousel-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      z-index: 2;
    }
    
    .carousel-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .carousel-dot.active {
      background: linear-gradient(135deg, #64d2ff, #a164ff);
      transform: scale(1.3);
      box-shadow: 0 0 10px rgba(100, 210, 255, 0.7);
    }
    
    .carousel-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(to right, #64d2ff, #a164ff);
      z-index: 2;
      transition: width 0.1s linear;
    }
    
    @media (max-width: 768px) {
      .premium-carousel-border {
        padding: 3px;
        border-radius: 12px;
      }
      
      .carousel-container {
        border-radius: 10px;
        aspect-ratio: 16/7; /* Adjust aspect ratio for smaller screens */
      }
      
      .carousel-btn {
        width: 28px;
        height: 28px;
      }
      
      .carousel-dots {
        bottom: 15px;
      }
    }
  `;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered]);

  // Auto-rotate progress indicator
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isHovered) return;
    
    setProgress(0);
    const duration = 5000;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };
    
    let animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex, isHovered]);

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto px-4"
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{carouselStyles}</style>
      
      {/* Premium Gradient Border */}
      <div className="premium-carousel-border">
        <div className="carousel-container">
          {/* Slides Container */}
          <div 
            className="carousel-slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="carousel-slide">
                <img
                  src={img}
                  alt={`Slide ${i + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="carousel-nav">
            <button 
              className="carousel-btn" 
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              &lt;
            </button>
            <button 
              className="carousel-btn" 
              onClick={nextSlide}
              aria-label="Next slide"
            >
              &gt;
            </button>
          </div>
          
          {/* Progress Bar */}
          <div 
            className="carousel-progress" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Dots Indicator */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;