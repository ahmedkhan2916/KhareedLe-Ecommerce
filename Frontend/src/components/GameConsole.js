import React from 'react';
import Video from '../assets/Video/ps5.mp4';
import "../assets/Style/Headings.css";

function GameConsole() {
  return (
    <div className='gameConsoleContainer pt-20'>

      {/* Heading */}
      <div className="gameConsoleHeading flex justify-center mb-4">
        <h1 className='text-5xl HeadingPlayFair font-bold'>Gaming Zone Here</h1>
      </div>

      {/* Video Section with Overlay */}
      <div className='gameConsoleContent flex flex-row justify-between relative'>

        {/* Video Container with Reduced Height */}
        <div className='videoSectionGameConsole relative w-full h-64 overflow-hidden rounded-lg'>
          <video className="videoTag w-full h-full opacity-30 object-cover " autoPlay loop muted>
            <source src={Video} type="video/mp4" />
          </video>

          {  /* Overlay Text */  }
 
          <div className="overlayText absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center z-20">

            <h2 className="text-3xl font-bold text-purple-600  hover:text-green-600 cursor-pointer">Experience the Future of Gaming</h2>
            <p className="text-lg mt-2 text-white">Tap the Banner to Explore Gaming Consoles</p>
            
          </div>
        </div>

      </div>

    </div>
  );
}

export default GameConsole;
