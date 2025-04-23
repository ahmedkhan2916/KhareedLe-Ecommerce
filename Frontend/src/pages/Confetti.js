import React from "react";
import confetti from "canvas-confetti";

const Celebrate = () => {
  const duration = 2 * 100; // 2 seconds
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
        particleCount: 20,
        spread: 360,
        colors: ["#ff0000", "#ffcc00", "#33cc33"],
      });
      
      confetti({
        particleCount: 10,
        shapes: ["circle", "square"],
        text: "🎉",
      });
      

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame(); // Call frame once to start the loop
};



export default Celebrate;
