import React from 'react'
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut } from "lucide-react";
import GELOGO2 from "../../assets/images/HeaderLogos/geLogo4.png"
import { useNavigate,useLocation } from 'react-router-dom';
import { useState ,useEffect} from 'react';

function SideBarAdDashboard() {

   const [activeTab, setActiveTab] = useState("dashboard");
  const navigate=useNavigate();
  const location=useLocation();


    useEffect(() => {

    const path = location.pathname.toLowerCase();
    if (path.includes("/users/adminproducts")) {
      setActiveTab("Products");
    } else if (path.includes("/users/admindash")) {
      setActiveTab("dashboard");
    } 
    else if(path.includes("/users/addproducts"))
    {

 setActiveTab("addproducts");

    }
    
    else {
      // fallback: clear or set a default
      setActiveTab("");
    }
  }, [location.pathname]);



 const  handleRoutes=(routeData)=>{



  if(routeData==="dashboard")
  {
setActiveTab("dashboard")
navigate("/users/admindash")


  }


   if(routeData==="Products")
  {
// setActiveTab("Products")
navigate("/users/adminproducts")


  }

    if(routeData==="add")
  {
// setActiveTab("Products")
navigate("/users/adminadd")


  }




 }









  return (
    <div className=' bg-green-700 h-full w-max'>
        <div className='mainSidebarContainer bg-cyan-950 h-screen w-full flex flex-col justify-evenly text-center'>

<div className='topTextSideBar text-white flex items-center flex-col'>

  <img src={GELOGO2}  className='GELOGO2 h-28'></img>
    <h1 className='text-sm bitcount-single-Nothing  '>TECHARENA — Smart Shopping, Fast Living</h1> 

</div>


<div className='topDiv flex flex-col justify-evenly  h-60 text-center'>

    <div className='sideItemButtons text-white '>
      
        <button className={`btnADashboard p-3 w-3/4  rounded-lg inline-flex hover:bg-green-600 items-center bitcount-single-Nothing ${
              activeTab === "dashboard" ? "bg-green-400 text-black" : "hover:bg-gray-700"
            }`} onClick={()=>(handleRoutes("dashboard"))}>   <LayoutDashboard size={20} className='mr-1'/>   Dashboard</button>

    </div>

       <div  className='sideItemButtons text-white'>

            <button className={`btnADashboard p-3 w-3/4  rounded-lg inline-flex hover:bg-green-600 items-center bitcount-single-Nothing ${
              activeTab === "Products" ? "bg-green-400 text-black" : "hover:bg-gray-700"
            }`}  onClick={()=>(handleRoutes("Products"))}> <Package size={20} className='mr-1'/>Products</button>

       </div>


       <div  className='sideItemButtons text-white'>

<button className={`btnADashboard p-3 w-3/4  rounded-lg inline-flex hover:bg-green-600 items-center bitcount-single-Nothing ${
              activeTab === "add" ? "bg-green-400 text-black" : "hover:bg-gray-700"
            }`}  onClick={()=>(handleRoutes("add"))}> <PlusCircle size={20} className='mr-1'/>Add Products</button>

    </div>


       <div className='sideItemButtons text-white'>

<button className='btnADashboard p-3 w-3/4  rounded-lg inline-flex hover:bg-green-600 items-center bitcount-single-Nothing'> <Settings size={20} className='mr-1'/>Settings</button>

    </div>



</div>




{/* bottom item button */}


    <div className='bottomDiv'>

           <div className='sideItemButtons text-white'>

                <button className='btnADashboard p-3 w-3/4  rounded-lg inline-flex hover:bg-green-600 bitcount-single-Nothing'> <LogOut size={20} className='mr-1'/>Logout</button>

           </div>



    </div>







        </div>

    </div>
  )
}

export default SideBarAdDashboard