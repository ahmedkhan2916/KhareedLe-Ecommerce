import React, { useEffect } from 'react'
import Banner from "../assets/BannerImages/banner.png";
import Banner2 from "../assets/BannerImages/banner2.png";
import { useState } from 'react';
// import banner1 from "../assets/BannerImages/banner"

function NewArrival() {

    const [index,setIndex]=useState(0);

    const Images=[Banner,Banner2];

    useEffect(()=>{


        const Interval=setInterval(()=>{

        setIndex((prevIndex)=>(prevIndex+1)%Images.length)


        },3000);


        return () => clearInterval(Interval);


    },[Images.length]);




    
  return (
    <div className='newarrivalContainer'>
        <div className='newarrivalchildcontainer  flex justify-center'>
            
            <div className='imageBannerContainer'>




    <img src={Images[index]} className=''></img>






            </div>
            
            
            </div> 



    </div>
  )
}

export default NewArrival



// import React, { useState, useEffect } from "react";
// import "../assets/Style/NewArrival.css" // Add styles here

// const Slideshow = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false); // Track animation


//        const Images=["https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg","https://media.wired.com/photos/629133e5e9a46d033b3380c7/16:9/w_2399,h_1349,c_limit/Finding-a-PlayStation-5-Is-About-to-Get-Easier-Gear-shutterstock_1855958302.jpg"]

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 3000); // Change every 3 seconds

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const handleNext = () => {
//     setIsAnimating(true); // Start animation
//     setTimeout(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
//       setIsAnimating(false); // Reset animation
//     },500); // Match animation duration in CSS
//   };

//   return (
//     <div className="slideshow-container">
//       <div className={`slideshow-images ${isAnimating ? "animate" : ""}`}>
//         {Images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Slide ${index}`}
//             className={`slide ${index === currentIndex ? "active" : ""}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slideshow;
