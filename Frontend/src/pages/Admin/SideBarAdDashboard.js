import React from 'react'
import "../../assets/Style/adminSidebar.css";
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut } from "lucide-react";
import XARENA from "../../assets/images/HeaderLogos/arena3.png"
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
    <aside className="admin-sidebar">
      <div className="admin-sidebar__glow" />
      <div className="admin-sidebar__inner">
        <div className="admin-sidebar__brand">
          <img src={XARENA} className="admin-sidebar__logo" alt="X Arena" />
          <div>
            <p className="admin-sidebar__brand-title">Techarena Admin</p>
            <p className="admin-sidebar__brand-sub">Smart Shopping, Fast Living</p>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          <button
            className={`admin-sidebar__item ${activeTab === "dashboard" ? "admin-sidebar__item--active" : ""}`}
            onClick={() => (handleRoutes("dashboard"))}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className={`admin-sidebar__item ${activeTab === "Products" ? "admin-sidebar__item--active" : ""}`}
            onClick={() => (handleRoutes("Products"))}
          >
            <Package size={18} />
            Products
          </button>

          <button
            className={`admin-sidebar__item ${activeTab === "add" ? "admin-sidebar__item--active" : ""}`}
            onClick={() => (handleRoutes("add"))}
          >
            <PlusCircle size={18} />
            Add Products
          </button>

          <button className="admin-sidebar__item">
            <Settings size={18} />
            Settings
          </button>
        </nav>

        <div className="admin-sidebar__footer">
          <button className="admin-sidebar__item admin-sidebar__item--ghost">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}

export default SideBarAdDashboard
