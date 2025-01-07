import React from "react";
import { useState } from "react";
import "../assets/Style/ferris.css";
import Downarrow from "../assets/images/downarrow.png";

const FerrisWheel = () => {
  const items = Array.from({ length: 8 }, (_, i) => i + 1); // Generate 8 items
  const prizes = ["powerbank", "headphone", "glass", "cases", "neckband", "watch", "charger", "smartwatch"];

  const [rotation, setRotation] = useState(0); // Tracks rotation angle
  const [isSpinning, setIsSpinning] = useState(false); // To disable button while spinning
  const [winningPrize, setWinningPrize] = useState(null); // Tracks the winning prize

  const spinWheel = () => {
    setIsSpinning(true);
    setWinningPrize(null); // Reset winning prize

    // Simulate stopping randomly after spinning
    setTimeout(() => {
      const randomStop = Math.floor(Math.random() * 360); // Random degree
      const alignedStop = Math.ceil(randomStop / 45) * 45; // Align to 45° (8 items)
      const finalRotation = rotation + 360 * 4 + alignedStop; // 3 full spins + random position

      setRotation(finalRotation); // Set the final rotation

      // Calculate the winning prize
      const normalizedRotation = (finalRotation % 360 + 360) % 360; // Normalize to [0, 360)
      const segmentAngle = 360 / items.length; // Angle per segment
      const prizeIndex = Math.floor(normalizedRotation / segmentAngle); // Determine prize index
      console.log(prizeIndex);
      setTimeout(()=>{

        setWinningPrize(prizes[prizeIndex]); // Set the winning prize

      },4000)
    

      setIsSpinning(false);
    }, 1000); // Spins for 2 seconds before stopping
  };

  return (
    <div className="ferrisWheelContainer w-1/2 flex flex-col items-center justify-center">
      {/* Pointer */}
      <div>
        <img src={Downarrow} alt="Pointer" className="w-11 h-11" />
      </div>

      {/* Ferris Wheel */}
      <div
        className="circle"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "none" : "transform 4s ease-out",
        }}
      >
        {items.map((item, index) => (
          <div
            key={prizes[index]}
            className="item"
            id={prizes[index]}
            style={getPositionStyle(index, items.length)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Spin Button */}
      <button onClick={spinWheel} disabled={isSpinning} className="buttonFerris">
        Spin
      </button>

      {/* Winning Prize Message */}
      {winningPrize && (
        <div className="winning-message mt-4">
          <h2>🎉 Congratulations! You won: {winningPrize} 🎉</h2>
        </div>
      )}
    </div>
  );
};

// Function to calculate the position for each item
const getPositionStyle = (index, totalItems) => {
  const radius = 150; // Adjust based on the size of the circle
  const angle = (index / totalItems) * 2 * Math.PI;
  const x = radius + radius * Math.cos(angle); // X-coordinate
  const y = radius + radius * Math.sin(angle); // Y-coordinate

  return {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    transform: "translate(-50%, -50%)", // Center each item
  };
};

export default FerrisWheel;
