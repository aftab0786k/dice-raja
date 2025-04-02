// Filename: Dice3D.jsx
import React from "react";
import "./Dice3D.css"; // Ensure this CSS file contains the necessary styles

const Dice3D = ({ currentNumber, rolling, potColor }) => {
  // ** FIX: Correct mapping from number to face rotation **
  // Assumes CSS transform-origin is center and faces are positioned correctly relative to center.
  // The translateZ value must match half the cube's dimension defined in CSS.
  // Match this to the final translateZ value in Dice3D.css media queries (e.g., 1.5rem -> 24px if 1rem=16px)
  // Using a variable for consistency:
  const halfCubeSize = "1.5rem"; // Default based on common media query value in provided CSS

  const getCorrectRotation = (number) => {
    switch (number) {
      case 1:
        return `rotateX(0deg) rotateY(0deg)`; // Front face
      case 2:
        return `rotateX(-90deg) rotateY(0deg)`; // Top face
      case 3:
        return `rotateX(0deg) rotateY(90deg)`; // Right face (Rotated left view) - Check CSS mapping if needed
      case 4:
        return `rotateX(0deg) rotateY(-90deg)`; // Left face (Rotated right view) - Check CSS mapping if needed
      case 5:
        return `rotateX(90deg) rotateY(0deg)`; // Bottom face
      case 6:
        return `rotateX(0deg) rotateY(180deg)`; // Back face
      default:
        return `rotateX(0deg) rotateY(0deg)`; // Default to 1 if null/invalid
    }
  };

  // ** FIX: Dynamic Rolling Animation **
  // Generate random high-degree rotations for a tumble effect
  const rollingTransform = `rotateX(${Math.random() * 1440 + 720}deg) rotateY(${
    Math.random() * 1440 + 720
  }deg) rotateZ(${Math.random() * 1440 + 720}deg)`;

  // Determine the final rotation to show when not rolling
  const displayRotation = getCorrectRotation(currentNumber);

  // ** FIX: Render Dots using CSS Grid classes defined in Dice3D.css **
  const renderDots = (numberOfDots) => {
    // Use the dot-N classes from the CSS
    const dotElements = [];
    for (let i = 1; i <= numberOfDots; i++) {
      dotElements.push(<div key={i} className={`dot dot-${numberOfDots}`} />);
    }
    // Wrap in the container which might be used by the grid layout
    return <div className="dotContainer">{dotElements}</div>;
  };

  // Define faces according to a standard die layout (opposite faces sum to 7)
  // Ensure the `face` class (front, back, etc.) matches CSS transforms.
  const diceFacesData = [
    { id: 1, face: "front", dots: 1 }, // Front
    { id: 6, face: "back", dots: 6 }, // Back (Opposite 1)
    { id: 4, face: "right", dots: 4 }, // Right (Opposite 3) - Check CSS transform for 'right'
    { id: 3, face: "left", dots: 3 }, // Left (Opposite 4) - Check CSS transform for 'left'
    { id: 2, face: "top", dots: 2 }, // Top (Opposite 5)
    { id: 5, face: "bottom", dots: 5 }, // Bottom (Opposite 2)
  ];

  return (
    <div className="scene">
      {" "}
      {/* Provides 3D perspective */}
      <div
        className={`dice ${rolling ? "rolling" : ""}`}
        style={{
          // Apply rolling animation transform OR the final display rotation
          transform: rolling ? rollingTransform : displayRotation,
          // Smooth transition for roll animation and snapping to final state
          transition: rolling
            ? "transform 1s ease-out"
            : "transform 0.5s ease-in-out",
        }}
      >
        {/* Map through face data and render each face */}
        {diceFacesData.map((faceInfo) => (
          <div
            key={faceInfo.id}
            className={`diceFace ${faceInfo.face}`}
            style={{ backgroundColor: `var(--${potColor})` }} // Use CSS variable for pot color
          >
            {/* Render dots based on the number for this face */}
            {renderDots(faceInfo.dots)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dice3D;
