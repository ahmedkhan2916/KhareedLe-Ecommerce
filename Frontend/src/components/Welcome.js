// WelcomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { Rocket,ShoppingBag  } from 'lucide-react'; // You can replace this with an actual rocket image or SVG
import '../assets/Style/welcome.css'; // Add your CSS styles for the welcome screen

const Welcome = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Callback to hide welcome screen after few seconds
    }, 4000); // Show for 4 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="welcome-screen">
        <div className="khareedWelcomeHeading flex flex-row">
      <h1>Welcome to <span className="brand">KHAREED LE</span></h1>
      <ShoppingBag className="Shopping-Bag ml-1" size={22}></ShoppingBag>
      </div>
      <div className="rocket-loader">
        <div className="orbit">
          <Rocket className="rocket-icon" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
