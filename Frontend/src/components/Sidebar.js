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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Username=localStorage.getItem("username");

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative z-10">
      {/* Hamburger / X Button */}
      <button
        onClick={toggleSidebar}
        className=" p-3 focus:outline-none"
      >
        <div className={`space-y-1.5 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}>
          <span className={`block w-6 h-0.5 bg-black transition-all duration-1000 ${isOpen ? 'rotate-90 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all duration-1000 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all duration-1000 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-30 top-0 left-0 h-full w-11/12 text-center
             bg-white text-black p-5 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sideBarContainerChild`}
      >

        <div className="border-black border-b-2">
                <div className="login items-center flex-col  justify-center cursor-pointer relative flex sm:hidden">
        
        { Username ? (
          <>
        <div className='loginLogo'></div>
        <span>{Username}</span>
        </>
        )
        :
        (
        <>
        
        <div className='loginLogo'></div> 
        <button className="loginBtnNav bg-yellow-200 w-20 rounded mt-1" >Login</button>
        
        </>
        )}    
    
        </div>
        </div>


        <ul className="space-y-3 mt-7">
          <li className="cursor-pointer hover:bg-gray-300">Home</li>
          <li className="cursor-pointer hover:bg-gray-300">Products</li>
          <li className="cursor-pointer hover:bg-gray-300">About</li>
          <li className="cursor-pointer hover:bg-gray-300">Contact</li>
        </ul>
      </div>

      {/* Overlay (optional for dimming background) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        />
      )}
    </div>
  );
};

export default Sidebar;
