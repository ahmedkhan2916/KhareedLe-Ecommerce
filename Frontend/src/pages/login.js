import React, { useEffect, useState } from 'react'
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
import {loginUser,refreshToken} from "../store/dataSlice.js"
import { useNavigate,useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setAccessTK, setStatusCode,setUserId,setUsername,access_Tok_Store,fetchBagData,fetchBagTotal2,fetchUserID} from '../store/dataSlice.js'
import loginImage from "../assets/SignupImage/loginImage.jpg"
import "../assets/Style/Headings.css"
import { showTotalFuncHeader } from "../Services/apiService.js";
import {BASE_URL} from "../config/config.js";
import GELOGO from "../assets/images/HeaderLogos/geLogo.png"
import GELOGO2 from "../assets/images/HeaderLogos/arena3.png"


 
function Login() {
  
  const imgArray=[headphone,apple,airpods,samsung,applelogo,oneplus,oppo,vivo,moto,playstation,xbox];
  const navigate=useNavigate();
  const [currentIndex,setCurrentIndex]=useState(0);
  const [email,setEmail]=useState('');
  const [phNO,setPHNO]=useState();
  const [typeSet,setTypeSet]=useState(false);
  const [password,setPassword]=useState('');
  const [status2,setStatus]=useState(false);
 const dispatch= useDispatch();
 const detail=useSelector((state)=>state.AccessTK.Token)// this also fetching accessToken
 const { token, status,errorAccess  } = useSelector((state) => state.userAuth);

 console.log("Token from redux store>>>>>>>>",token);
// console.log("this is access token stored in redux",detail);
const location = useLocation();
const { loading, users, error } = useSelector(state => state.auth);
const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
const { totalBag,statusTotalBag,errorBagTotal,}=useSelector((state)=>state.fetchBagTotalStore);
console.log("the data is heree stored>>>>>>>>",users);
const [signal,setSignal]=useState("false");



useEffect(()=>{

  if(token)
  {
  
dispatch(fetchUserID(token)) //setting up accessToken in Redux
setSignal(true);

  }


},[token])



useEffect(()=>{

  if(signal===true)
  {
    const searchParams = new URLSearchParams(location.search); 
    setSignal(false);
   const redirectPath = searchParams.get('redirect') || '/';
    navigate(redirectPath);
    
  }


},[UserID])


// useEffect(()=>{

// dispatch(fetchBagTotal2(UserID));


// },UserID)


useEffect(() => {
  if (users && users.user && users.accessToken) {

    console.log("here is data",users);
    console.log("this is the userId coming",UserID);
    dispatch(setUserId(users.user.id));
    dispatch(setAccessTK(users.accessToken));
    dispatch(setUsername(users.user.name));
    // dispatch(fetchBagData(users.user.id));
    dispatch(refreshToken())

    // dispatch(fetchBagTotal2(users.user.id));
  
 
  }
}, [users]);




   const handleLogin=async(e)=>{

    e.preventDefault();

    console.log("this is my email and password",email,password);

    const EMAILORPHONENO=email || phNO

    const bodyData={
      
        EMAILORPHONENO:EMAILORPHONENO,
        password:password,

    }

    dispatch(loginUser(bodyData));

    // afterLoggedIn();

    
   }
  
  useEffect(()=>{

    const interval=setInterval(()=>{

        setCurrentIndex((prevIndex)=>

    prevIndex===imgArray.length-1?0:prevIndex+1

        );

    },1500)

},[])


const handleSetPHOREMAIL=(e)=>{

  const value = e.target.value;


  if (value === "") {
    setEmail("");
    setPHNO("");
    setTypeSet(false); // Reset typeSet if input is empty
    return;
  }


  if (/^\d+$/.test(value)) {
    setTypeSet(true); // Set typeSet to true if input is numeric
    setPHNO(value); // Set as phone number if input is numeric
  } else {
    setTypeSet(false);
    setEmail(value); // Set as email if input is not numeric
  }

}

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">

      {/* Left Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center px-6 py-10 loginLeftPanel">
        <div className="flex items-center gap-2 mb-6 flex-col">
          {/* <img src={GELOGO} alt="company logo" className='GELOGO h-24'></img> */}
          <div className='GETEXTCONTAINER flex'>
          {/* <h1 className="text-3xl md:text-5xl font-bold HeadingPlayFair">TechArena</h1> */}
          <img src={GELOGO2}  className='GELOGO2 h-64'></img>
          {/* <img src={shoppingBag} alt="logo" className="h-10 md:h-14" /> */}
          </div>
        </div>

        <h3 className="text-center text-2xl md:text-3xl font-bold mb-2 loginLeftHeading">
          <span className="inline-flex items-center gap-2 loginHeadingBadge flex-col md:flex-row">
            <svg
              className="w-10 h-10"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="vrGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="26" stroke="url(#vrGradient)" strokeWidth="4" />
              <path d="M14 32h14l4 12 4-12h14" stroke="url(#vrGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M42 20h8c5 0 8 3 8 8s-3 8-8 8h-8" stroke="url(#vrGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="loginHeadingText" aria-label="Step Into The 3D/VR Storefront">
              {"Step Into The 3D/VR Storefront".split("").map((ch, i) => (
                <span
                  key={i}
                  className="loginHeadingChar"
                  style={{ "--i": i }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </span>
        </h3>
        <p className="text-center text-sm md:text-lg max-w-md mb-4 font-semibold loginLeftSub">
          Welcome to X ARENA — Where innovation meets shopping. Dive into our immersive 3D and VR-powered store, explore products from every angle, and enjoy exclusive offers tailored for you. Log in and enter the future of retail.
        </p>
        

        <div className="flex gap-3 mb-5">
          <span className="loginBadge">360Â° View</span>
          <span className="loginBadge">VR Ready</span>
          <span className="loginBadge">Fast Checkout</span>
        </div>

        {/* <div className="text-center text-sm mb-4 text-black">
          <p className="underline hover:text-green-600 cursor-pointer">+91-8882066763</p>
          <p className="underline hover:text-green-600 cursor-pointer">+91-8882066555</p>
        </div> */}

        <div className="flex gap-5 loginSocialRow">
          <img src={Whatsapp} alt="whatsapp" className="h-6 cursor-pointer" />
          <img src={Instagram} alt="instagram" className="h-6 cursor-pointer" />
          <img src={Facebook} alt="facebook" className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white p-6 rounded-xl loginCard">
          <div className="w-full h-16 overflow-hidden rounded-xl mb-3 mx-auto loginIconTile">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {imgArray.map((img, i) => (
                <img key={i} src={img} alt="icon" className="h-16 min-w-full object-contain" />
              ))}
            </div>
          </div>
          <div className='loginText'>
          <h2 className="text-3xl font-bold HeadingPlayFair mb-1 text-center bitcount-single-Nothing loginHeading">Login</h2>
          <p className="text-center text-gray-600 mb-6 loginSubheading">Please enter your credentials to log in</p>
</div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type={`${ typeSet ? "number" : "text"}`}
              placeholder="Email or Phonenumber"
              value={email || phNO}
              onChange={(e) => handleSetPHOREMAIL(e)}
              required
              className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <button
              type="submit"
              className="w-full h-11 bg-black text-white rounded-md font-semibold transition loginButton">

              Login


            </button>
          </form>

          <p className="text-center mt-6 text-green-600 underline cursor-pointer bitcount-single-Nothing  hover:text-red-500 " onClick={() => navigate("/users/signup")}>
            Back to Signup Page
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
