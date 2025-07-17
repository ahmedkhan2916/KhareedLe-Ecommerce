// import React from "react";
// import { useState } from "react";
// import "../assets/Style/ferris.css";
// import Downarrow from "../assets/images/downarrow.png";
// import {useNavigate}  from "react-router-dom"
// import Celebrate from "../pages/Confetti.js"
// import "../assets/Style/Headings.css"

// const FerrisWheel = () => {
//   const items = Array.from({ length: 8 }, (_, i) => i + 1); // Generate 8 items
//   const prizes = ["powerbank", "headphone", "glass", "cases", "neckband", "watch", "charger", "smartwatch"];

//   const [rotation, setRotation] = useState(0); // Tracks rotation angle
//   const [isSpinning, setIsSpinning] = useState(false); // To disable button while spinning
//   const [winningPrize, setWinningPrize] = useState(null); // Tracks the winning prize
//   const navigate=useNavigate();


//   const congratsThreeTimes=()=>{
        
//     Celebrate();
    
    
//         }
    
    
  




//   const spinWheel = () => {
//     setIsSpinning(true);
//     setWinningPrize(null); // Reset winning prize

//     // Simulate stopping randomly after spinning
//     setTimeout(() => {
//       const randomStop = Math.floor(Math.random() * 360); // Random degree
//       const alignedStop = Math.ceil(randomStop / 45) * 45; // Align to 45° (8 items)
//       const finalRotation = rotation + 360 * 4 + alignedStop; // 3 full spins + random position

//       setRotation(finalRotation); // Set the final rotation

//       // Calculate the winning prize
//       const normalizedRotation = (finalRotation % 360 + 360) % 360; // Normalize to [0, 360)
//       const segmentAngle = 360 / items.length; // Angle per segment
//       const prizeIndex = Math.floor(normalizedRotation / segmentAngle); // Determine prize index
//       console.log(prizeIndex);
//       setTimeout(()=>{

//         setWinningPrize(prizes[prizeIndex]); // Set the winning prize
       
//         const intervalID=setInterval(()=>{
    
             
//           congratsThreeTimes();



//       },1500)

//       setTimeout(() => {
//           clearInterval(intervalID);
          
//         }, 5000);
     
//         return () => clearInterval(intervalID); 
//       },4000)
    
//       setTimeout(()=>{

//         navigate("/users/payment");
      
//       },12000)

//       setIsSpinning(false);
//     }, 1000); // Spins for 2 seconds before stopping
//   };

//   return (
//     <div className="ferrisWheelParentContainer flex items-center">
//     <div className="ferrisWheelContainer w-1/2 flex flex-col items-center justify-center h-screen">
//       {/* Pointer */}
//       <div>
//         <img src={Downarrow} alt="Pointer" className="w-11 h-11" />
//       </div>

//       {/* Ferris Wheel */}
//       <div
//         className="circle"
//         style={{
//           transform: `rotate(${rotation}deg)`,
//           transition: isSpinning ? "none" : "transform 4s ease-out",
//         }}
//       >
//         {items.map((item, index) => (
//           <div
//             key={prizes[index]}
//             className="item"
//             id={prizes[index]}
//             style={getPositionStyle(index, items.length)}
//           >
//             {item}
//           </div>
//         ))}
//       </div>

//       {/* Spin Button */}
//       <button onClick={spinWheel} disabled={isSpinning} className="buttonFerris">
//         Spin
//       </button>

//       {/* Winning Prize Message */}

     
    
//     </div>

//     <div className="absolute top-7 left-1/2">
//       <h1 className="text-5xl HeadingPlayFair">Winning Spin Wheel🎡</h1>
//     </div>

//     {winningPrize && (
//         <div className="winning-message mt-4">
//           <h1 className="text-3xl">🎉 Congratulations! You won: {winningPrize} 🎉</h1>
//         </div>
//       )}

//     </div>

//   );
// };

// // Function to calculate the position for each item
// const getPositionStyle = (index, totalItems) => {
//   const radius = 150; // Adjust based on the size of the circle
//   const angle = (index / totalItems) * 2 * Math.PI;
//   const x = radius + radius * Math.cos(angle); // X-coordinate
//   const y = radius + radius * Math.sin(angle); // Y-coordinate

//   return {
//     position: "absolute",
//     left: `${x}px`,
//     top: `${y}px`,
//     transform: "translate(-50%, -50%)", // Center each item
//   };
// };

// export default FerrisWheel;

















import React from "react";
import { useState } from "react";
import "../assets/Style/ferris.css";
import Downarrow from "../assets/images/downarrow.png";
import { useNavigate } from "react-router-dom";
import Celebrate from "../pages/Confetti.js";
import "../assets/Style/Headings.css";

const FerrisWheel = () => {
  const items = Array.from({ length: 8 }, (_, i) => i + 1);
  const prizes = ["powerbank", "headphone", "glass", "cases", "neckband", "watch", "charger", "smartwatch"];

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const navigate = useNavigate();

  const congratsThreeTimes = () => {
    Celebrate();
  };

  const spinWheel = () => {
    setIsSpinning(true);
    setWinningPrize(null);

    setTimeout(() => {
      const randomStop = Math.floor(Math.random() * 360);
      const alignedStop = Math.ceil(randomStop / 45) * 45;
      const finalRotation = rotation + 360 * 4 + alignedStop;

      setRotation(finalRotation);

      const normalizedRotation = (finalRotation % 360 + 360) % 360;
      const segmentAngle = 360 / items.length;
      const prizeIndex = Math.floor(normalizedRotation / segmentAngle);

      setTimeout(() => {
        setWinningPrize(prizes[prizeIndex]);

        const intervalID = setInterval(() => {
          congratsThreeTimes();
        }, 1500);

        setTimeout(() => {
          clearInterval(intervalID);
        }, 5000);

        return () => clearInterval(intervalID);
      }, 4000);

      setTimeout(() => {
        navigate("/users/payment");
      }, 12000);

      setIsSpinning(false);
    }, 1000);
  };

  return (
   <div className="ferrisWheelParentContainer flex flex-col  justify-center min-h-screen px-4 relative font-[Poppins] bg-gradient-to-br from-blue-100 to-purple-200">

      <div className={`ferrisWheelContainer w-full mt-14 md:w-1/2 ${winningPrize?'hidden': 'flex'} flex-col items-center justify-center`}>
        {/* Pointer */}
       <img src={Downarrow} alt="Pointer" className="w-10 h-10 z-10 mb-4 drop-shadow-lg" />


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
     <button
  onClick={spinWheel}
  disabled={isSpinning}
  className="buttonFerris mt-6 px-6 py-3 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 shadow-lg transition-all duration-300 disabled:opacity-50"
>
  {isSpinning ? "Spinning..." : "🎯 Spin Now"}
</button>
      </div>

      {/* Title */}
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
  <h1 className="text-3xl md:text-5xl font-[Playfair_Display] font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-transparent bg-clip-text drop-shadow-lg">
    🎡 Spin & Win Surprise Gifts 🎁
  </h1>
  <p className="text-sm md:text-base mt-2 text-gray-700 font-[Poppins] italic">
    Test your luck and claim your reward!
  </p>
</div>

      {/* Winning Prize */}
{winningPrize && (
  <div className="winning-message  text-center px-4">
    <h1 className="text-2xl md:text-3xl font-bold text-green-600 bg-white py-4 px-6 rounded-xl shadow-xl inline-block">
      🎉 You won: <span className="text-purple-600">{winningPrize}</span> 🎉
    </h1>
  </div>
)}
    </div>
  );
};

// Responsive position calculation
const getPositionStyle = (index, totalItems) => {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth <= 768;
  const radius = isMobile ? 100 : 150;
  const angle = (index / totalItems) * 2 * Math.PI;
  const x = radius + radius * Math.cos(angle);
  const y = radius + radius * Math.sin(angle);

  return {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    transform: "translate(-50%, -50%)",
  };
};

export default FerrisWheel;
