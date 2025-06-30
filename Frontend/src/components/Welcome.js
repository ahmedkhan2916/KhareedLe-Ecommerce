// WelcomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { Rocket,ShoppingBag  } from 'lucide-react'; // You can replace this with an actual rocket image or SVG
import '../assets/Style/welcome.css'; // Add your CSS styles for the welcome screen
import { useSelector } from 'react-redux';


const Welcome = ({ onFinish }) => {

  const { token, status,errorAccess  } = useSelector((state) => state.userAuth);


useEffect(() => {
  let count = 0;

  const interval = setInterval(() => {
    if (!token || status === "succeeded" || status === "failed" || count >= 10) {
      clearInterval(interval);
      onFinish(); // Call your callback
    }
    count++;
  }, 500); // check every 500ms

  return () => clearInterval(interval); // cleanup on unmount
}, [token, status, onFinish]);


 

  return (
    <div className="welcome-screen">
        <div className="khareedWelcomeHeading flex flex-row">
      <h1>Welcome to <span className="brand">KHAREED LE</span><span className="trademark text-sm align-super">®</span></h1>
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
