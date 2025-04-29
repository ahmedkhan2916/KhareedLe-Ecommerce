import React, { useState } from 'react'
import "../assets/Style/login.css"
import axios from "axios"

// import fashion from '../assets/LoginLogos/fashion.png';
// import gameConsole from '../assets/LoginLogos/game-console.png'
// import highHeels from '../assets/LoginLogos/high-heels.png'
// import laptop from '../assets/LoginLogos/laptop.png'
// import mobile from '../assets/LoginLogos/mobile.png'
// import sneaker from '../assets/LoginLogos/sneakers.png'
import shoppingBag from "../assets/LoginLogos/shopping-bag.png"

import Instagram from "../assets/Socialicons/instagram.png"
import Whatsapp from "../assets/Socialicons/whatsapp.png"
import Facebook from "../assets/Socialicons/facebook.png"

import headphone from "../assets/LoginLogos/headphone.png"
import laptop from "../assets/LoginLogos/laptop.png"
import apple from "../assets/LoginLogos/apple.png"
import powerbank from "../assets/LoginLogos/powerbank.png"
import samsung from "../assets/LoginLogos/samsung.png"
import applelogo from "../assets/LoginLogos/applelogo.png"
import oneplus from "../assets/LoginLogos/one-plus.png"
import oppo from "../assets/LoginLogos/oppo.png"
import vivo from "../assets/LoginLogos/vivo.png"
import moto from "../assets/LoginLogos/motorola.png"
import playstation from "../assets/LoginLogos/playstation.png"
import xbox from "../assets/LoginLogos/xbox.png"
import airpods from "../assets/LoginLogos/airpods.png"

import { useNavigate,useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setAccessTK, setStatusCode,setUserId,setUsername} from '../store/dataSlice.js'
import loginImage from "../assets/SignupImage/loginImage.jpg"
import "../assets/Style/Headings.css"


 
function Login() {
  
  const imgArray=[headphone,apple,airpods,samsung,applelogo,oneplus,oppo,vivo,moto,playstation,xbox];
  const navigate=useNavigate();
  const [currentIndex,setCurrentIndex]=useState(0);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [status,setStatus]=useState(false);
 const dispatch= useDispatch();
 const detail=useSelector((state)=>state.AccessTK.Token)
//  console.log("this is access token stored in redux",detail);
const location = useLocation();





   const handleLogin=async(e)=>{

    e.preventDefault();

    console.log("this is my email and password",email,password);

    const bodyData={
      
        email:email,
        password:password,

    }

    try{

        const response=await axios.post("http://localhost:1000/users/login",bodyData,  {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // This ensures the browser sends and receives cookies
          });
        console.log("loggin succesfuly",response.data);
        console.log("cookie here",document.cookie);
        const {accessToken,refreshToken,user,id}=response.data;
        console.log("This is new data cookies",accessToken,user,"This is refreshToken",refreshToken);
        localStorage.setItem('refreshToken',refreshToken);
        localStorage.setItem('accessToken',accessToken);
        sessionStorage.setItem("accessToken",accessToken);
        // dispatch(setUserId(user.));
        dispatch(setUserId(user.id));
        dispatch(setAccessTK(accessToken));
        console.log("user json",user.id);
        // dispatch(setStatusCode(user.status));
        dispatch(setUsername(user.name));
        
      
        
//         const token=accessToken;
//         if(!token)
// {
//     console.log("token is not present");
// }

// else{
//             const IDS=await axios.get("http://localhost:1000/users/userid-fetch", {

//             headers: {
//             Authorization: `Bearer ${token}`,

//           },});

//           console.log("here is userid with middleware",IDS.data.ID);
//           dispatch(setUserId(IDS.data.ID));
//           localStorage.setItem("userID",IDS.data.ID);
        

          
//           if(!IDS)
//           {
//             console.log("user id not recieve");
//           }
         
//         }


        setStatus(true);
        const searchParams = new URLSearchParams(location.search);
        const redirectPath = searchParams.get('redirect') || '/'; // fallback to home if not found
      
        navigate(redirectPath);
        
        
    }catch(error){
        console.log(email,password);
        console.error(error);
    }
    
   }
  
  useState(()=>{

    const interval=setInterval(()=>{

        setCurrentIndex((prevIndex)=>

    prevIndex===imgArray.length-1?0:prevIndex+1

        );
//    return clearInterval(interval);
    },1500)

    // return clearInterval(interval)
},[])

  return (
    <div className="loginContainer  w-full min-h-screen" style={{ 
        position:'relative',
        overflow:'hidden',
        // backgroundImage: `url(${loginImage})`, 
        // backgroundSize: 'cover', 
        // backgroundPosition: 'center', 
        height: '100vh', // Ensure the height is set
        width: '100vw'   // Ensure the width is set
      }}>
    <div className='loginDoubleContainer flex w-full min-h-screen  '>

    <div className="leftContainer  w-1/2 ">

        <div className="leftContainerChild  relative top-14 left-20">
       <div className="brandDiv flex items-center  w-fit">
        <h1 className="text-6xl text-black HeadingPlayFair">KHAREED LAY</h1>
        <img src={shoppingBag} className='h-14 pl-1 mb-3 '></img>
        </div>
<div className="overflow-hidden w-28 logoContainer my-5  rounded-xl">



<div className="LogoSliderCont flex object-contain" style={{transform:`translateX(-${currentIndex*100}%)`,transition:"transform 0.5S ease-in-out"}}>


{
    imgArray.map((item,index)=>(

<img src={item}  key={index} className="h-28 min-w-full"></img>

    ))
}
    </div>
    </div>


    <div className='ourDetails my-6 w-4/5'>
    
    <h1 className="text-xl text-black">WELCOME TO OUR STORE FOR EXPLORE AMAZING PRODUCTS AT AMAZING PRICE LOGIN PLEASE..!!</h1>

    </div>

    <div className="helplineNumber flex flex-col">

    <span className="text-base underline text-black cursor-pointer hover:text-green-600 w-max ">+91-8882066763</span>
    <span className="text-base underline text-black cursor-pointer w-max hover:text-green-600">+91-8882066555</span>

    </div>

    <div className="SocialMediaCont  w-1/4 mt-6">

    <div className='socialMedia flex w-full justify-around'>

    <img src={Whatsapp} className="h-7 cursor-pointer"></img>
    <img src={Instagram}  className="h-7 cursor-pointer"></img>
    <img src={Facebook}  className="h-7 cursor-pointer"></img>

    </div>

    </div>
      
    </div>
   
    </div>


    <div className="rightContainer flex items-center  w-1/2">

<div className="formContainer pt-16 text-center w-3/4 h-4/5  ml-7 rounded-xl">
    <div className='form'>

<div classname="formTextCont">

    <h1 className='LoginText text-6xl text-black HeadingPlayFair'>Login</h1>
    <span className='w-max text-black HeadingPlayFair'>Please Enter your credentials to Login..!</span>

    </div>

        <form className='formSubmit ' onSubmit={handleLogin}>

        <input className="inp w-8/12 h-10 rounded-md placeholder-neutral-800 " placeholder='Username or Email' type='text' value={email} onChange={(e)=>setEmail(e.target.value)} required></input>

        <input className="inp w-8/12 h-10 rounded-md placeholder-neutral-800 mt-2" placeholder='Password' type='text' value={password}onChange={(e)=>setPassword(e.target.value)} required></input>

        <button type="submit" className="btnLogin w-8/12 h-10 rounded-md bg-black text-white mt-2 text-xl hover:bg-lime-400  hover:text-black"  >Login</button>

        <span className=' flex underline text-green-600 justify-center mt-10 cursor-pointer hover:text-red-600' onClick={()=>navigate("/users/signup")}>Back to Signup Page</span>
         
        </form>
    </div>

    </div>

    </div>

    </div>

    </div>
  )
}

export default Login;