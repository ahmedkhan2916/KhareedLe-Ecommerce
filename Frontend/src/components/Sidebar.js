// import React from 'react'
// import {useState} from "react"
// import "../assets/Style/Sidebar.css"

// function Sidebar() {


//     const [sideBar,setSideBar]=useState(0)

    

// const handleSidebar=()=>{

    
// if(sideBar)
// {
//     setSideBar(0);
// }

// else{

//     setSideBar(1);
// }






// }







//   return (

//     <div className="SideBarContainer  z-10">

//     <div className='hamContainer flex items-center mt-5'>     

//    <a href="javascript:void(0);" class="icon" onClick={handleSidebar}>

// <div className='hamburger'></div>
// <div className='hamburger'></div>
// <div className='hamburger'></div>

// </a>
// </div>


//         <div className={`sideBarContainerChild  ${sideBar?'block':'hidden'}`}>
    
//     <nav className="navbarContainer">
//         <ul className="ulContainer">
//             <li className="navItem">
//                 <a href="/products">Products</a>
//             </li>
//             <li className="navItem">
//                 <a href="/users/login">Login</a>
//             </li>
//             <li className="navItem">
//                 <a href="/users/signup">Signup</a>
//             </li>
//             <li className="navItem">
//                 <a href="/users/logout">Logout</a>
//             </li>

//         </ul>



//     </nav>


//         </div>


//     </div>

//   )
// }

// export default Sidebar





















import { useState } from 'react';
import Logout from "../components/Logout.js";
import {
  Home,
  ShoppingBag,
  Info,
  Phone,
  LogIn,
  UserCircle,
  Heart,
  
  Package,
  MapPin,
  Gift,
} from 'lucide-react';

import {useNavigate} from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Username = localStorage.getItem("username");
  const navigate=useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

   const handleOrders=()=>{
  
        navigate("/users/my-orders");
  
      }

     

  return (
    <div className="relative z-50 ">
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-white p-3 rounded-full shadow-md"
      >
        <div className="space-y-1 transition-all duration-300">
          <span className={`block w-6 h-0.5 bg-black transition-transform duration-500 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-black transition-opacity duration-500 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-black transition-transform duration-500 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out rounded-r-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center border-b border-gray-300 py-6">
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner">
            🛒
          </div>
          {Username ? (
            <span className="mt-2 text-lg font-medium text-gray-800">{Username}</span>
          ) : (
            <button className="mt-2 bg-yellow-300 px-4 py-1 rounded hover:bg-yellow-400 transition">
              <LogIn className="inline-block mr-1 w-4 h-4" />
              Login
            </button>
          )}
        </div>

        {/* Navigation */}
        <ul className="mt-6 space-y-4 text-gray-700 font-medium px-6">
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <Home className="w-5 h-5" />
            Home
          </li>
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <ShoppingBag className="w-5 h-5" />
            Products
          </li>
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <Info className="w-5 h-5" />
            About
          </li>
              <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <ShoppingBag className="w-5 h-5" />
            Shop Products
          </li>
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <Heart className="w-5 h-5" />
            Wishlist
          </li>
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition" onClick={handleOrders}>
            <Package className="w-5 h-5" />
            My Orders
          </li>
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <Gift className="w-5 h-5" />
            Offers & Gifts
          </li>
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <MapPin className="w-5 h-5" />
            My Address
          </li>
          <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer transition">
            <Phone className="w-5 h-5" />
            Contact
          </li>
          {Username && (
            <li className="flex items-center gap-3 hover:text-red-500 cursor-pointer transition">
              <UserCircle className="w-5 h-5" />
              <Logout />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;














