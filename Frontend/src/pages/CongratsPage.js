import React from 'react'
import Celebrate from "./Confetti.js"
import {useEffect} from "react"
import { useLocation , useNavigate} from "react-router-dom";
import axios from "axios"
import {useSelector} from 'react-redux';
import {fetchID} from "../Services/apiService.js";
import { useDispatch } from 'react-redux';
// import {BooleanSignal} from "../../src/store/dataSlice.js";
import {setSignal} from "../../src/store/dataSlice.js"
//store a true value here in redux....>>>>

function CongratsPage() {

        const location = useLocation();
        const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
        const product = useSelector(state => state.product.product); 
        const navigate=useNavigate()
        const dispatch=useDispatch();
        const Signal_Boolean_Response=useSelector(state=>state.signal)

        // console.log(Signal_Boolean_Response);
    const congratsThreeTimes=()=>{
        
Celebrate();

}

    useEffect(()=>{

      const intervalID=setInterval(()=>{
        
            congratsThreeTimes();

},1500)
         
        setTimeout(async() => {

            const ID=await fetchID(token);

            console.log("this  is user iddd",ID)

            const Ids={userId:ID,productId:product.id,Signal:true}

            const response=await axios.post("http://localhost:1000/users/addbag",Ids); 
 
            console.log("Response done",response);

            // dispatch(BooleanSignal({Signal:true}));

            // const dataBag=await axios.post("http://localhost:1000/users/clear-bag",{userId:ID});

            // console.log("Response done DataBag",dataBag);
            
            //Tommorow fix the empty bag logic:-

            dispatch(setSignal({Signal:true}));

            navigate("/");

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