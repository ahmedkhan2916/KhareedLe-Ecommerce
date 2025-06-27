import React from 'react'
import logoutPNG from "../assets/LoginLogos/logout.png"
import { fetchData,refreshToken,setSignal ,setBagData,fetchBagData,fetchUserID,fetchBagTotal2,setTotalBagNull,userIDNULL} from '../store/dataSlice.js';
import {logoutAccessTK,logout} from '../store/dataSlice.js'
import { clearBag, increment, setStatusCode } from '../store/dataSlice.js';
import axios from "axios";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../config/config.js";


function Logout() {

   
      const dispatch = useDispatch();   // ✅ correct usage
  const navigate = useNavigate();  


    const handleLogout=async()=>{
    
      try{
 
          // const ID=await fetchID(token);
          const logout_res=await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
          document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          console.log("successMessage",logout_res);
          dispatch(logout());
          dispatch(logoutAccessTK());
          dispatch(clearBag())
          dispatch(setTotalBagNull())
          dispatch(userIDNULL())
          navigate("/users/login");
          
    
        }catch(err){
    console.log(err);
    
        }
    }




  return (


    <div>

    <li className='listProfile pt-1 text-xl flex' onClick={handleLogout}> Logout <img src={logoutPNG} className="h-6 pl-1"></img></li>
    </div>

  )
}


export default Logout;