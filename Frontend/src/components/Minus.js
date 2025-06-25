import React from 'react'
import axios from 'axios';
import { fetchUserID,refreshToken } from '../store/dataSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect} from 'react';

function Minus() {

    const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();
    const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
    
    useEffect(()=>{

        dispatch(refreshToken);

    },[])


    useEffect(()=>{

 dispatch(fetchUserID(token));

    },[])


    const handleRemoveQuantity = async () => {
        // Logic to handle removing quantity
       

        try{
//continue from here tommorow create and hit a api to backend using a productId and a Signal:----------
            console.log("Here is your UserID and token",UserID,token);
            const response=await axios.post("http://localhost:1000/users/inc-dec-items", {UserID:UserID,productId:'67e99ccff26f69122fbd340f',Signal:'min'});
            console.log("Response from server:", response.data);
        }
        catch(err)
        {

            console.log(err);

        }





    }




  return (
    <div className="minButton">

        <button className="minusButton flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors" onClick={handleRemoveQuantity}>
            -
        </button>
        
      

    </div>
  )
}

export default Minus