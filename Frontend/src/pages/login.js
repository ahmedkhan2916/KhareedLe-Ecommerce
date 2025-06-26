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


 
function Login() {
  
  const imgArray=[headphone,apple,airpods,samsung,applelogo,oneplus,oppo,vivo,moto,playstation,xbox];
  const navigate=useNavigate();
  const [currentIndex,setCurrentIndex]=useState(0);
  const [email,setEmail]=useState('');
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
  axios.get('https://khareedle-ecommerce.onrender.com/users/test-cookies', {
    withCredentials: true,
  }).then(res => console.log("Cookies from backend:", res.data.cookies));
}, []);



useEffect(() => {
  if (users && users.user && users.accessToken) {

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

    const bodyData={
      
        email:email,
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

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">

      {/* Left Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center px-6 py-10 bg-gray-50">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl md:text-5xl font-bold HeadingPlayFair">KHAREED LAY</h1>
          <img src={shoppingBag} alt="logo" className="h-10 md:h-14" />
        </div>

        <div className="w-24 h-24 overflow-hidden rounded-xl mb-4">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {imgArray.map((img, i) => (
              <img key={i} src={img} alt="icon" className="h-24 min-w-full object-contain" />
            ))}
          </div>
        </div>

        <p className="text-center text-sm md:text-lg max-w-xs mb-4 text-gray-700">
          WELCOME TO OUR STORE – EXPLORE AMAZING PRODUCTS AT AMAZING PRICES. PLEASE LOGIN!
        </p>

        {/* <div className="text-center text-sm mb-4 text-black">
          <p className="underline hover:text-green-600 cursor-pointer">+91-8882066763</p>
          <p className="underline hover:text-green-600 cursor-pointer">+91-8882066555</p>
        </div> */}

        <div className="flex gap-5">
          <img src={Whatsapp} alt="whatsapp" className="h-6 cursor-pointer" />
          <img src={Instagram} alt="instagram" className="h-6 cursor-pointer" />
          <img src={Facebook} alt="facebook" className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold HeadingPlayFair mb-1 text-black text-center">Login</h2>
          <p className="text-center text-gray-600 mb-6">Please enter your credentials to log in</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full h-11 bg-black text-white rounded-md hover:bg-lime-400 hover:text-black font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-green-600 underline cursor-pointer hover:text-red-500" onClick={() => navigate("/users/signup")}>
            Back to Signup Page
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
