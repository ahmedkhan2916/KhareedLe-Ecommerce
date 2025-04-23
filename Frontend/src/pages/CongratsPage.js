import React from 'react'
import Celebrate from "./Confetti.js"
import {useEffect} from "react"
import { useLocation } from "react-router-dom";


function CongratsPage() {

    const location = useLocation();

    const congratsThreeTimes=()=>{
        
Celebrate();

}

    useEffect(()=>{

      const intervalID=setInterval(()=>{

            congratsThreeTimes();

},1500)

        setTimeout(() => {
            clearInterval(intervalID);
            
          }, 5000);
       
          return () => clearInterval(intervalID); // Cleanup when component unmounts
    },[location])



  return (

    <div className="CongratsDiv w-screen">
        <div className="CongratsChildDiv bg-green-50 flex justify-center flex-col items-center h-screen w-screen">
            <h1 className="CongratsHeading text-3xl md:text-6xl">Congratulations</h1>
            <div className="orderPlacedText mt-2">
            <p className="CongratsText">Your Order has been placed successfully</p>
            <p className="CongratsText">You will receive a confirmation email shortly</p>
</div>
        </div>
    </div>

  )
}

export default CongratsPage