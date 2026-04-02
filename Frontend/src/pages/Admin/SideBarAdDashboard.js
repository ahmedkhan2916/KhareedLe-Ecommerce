import React from 'react'
import "../../assets/Style/adminSidebar.css";
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut, Sparkles, ChevronRight } from "lucide-react";
import XARENA from "../../assets/images/HeaderLogos/arena3.png"
import { useNavigate,useLocation } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout, logoutAccessTK, clearBagSlice, logoutAdmin } from '../../store/dataSlice.js';
import { BASE_URL } from '../../config/config.js';

function SideBarAdDashboard() {

   const [activeTab, setActiveTab] = useState("dashboard");
  const navigate=useNavigate();
  const location=useLocation();
  const dispatch = useDispatch();

  const navigationItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      hint: "Overview and quick stats",
      icon: LayoutDashboard,
    },
    {
      key: "Products",
      label: "Products",
      hint: "Manage inventory",
      icon: Package,
    },
    {
      key: "add",
      label: "Add Product",
      hint: "Create a new listing",
      icon: PlusCircle,
    },
  ];


    useEffect(() => {

    const path = location.pathname.toLowerCase();
    if (path.includes("/users/adminproducts")) {
      setActiveTab("Products");
    } else if (path.includes("/users/admindash")) {
      setActiveTab("dashboard");
    } 
    else if(path.includes("/users/adminadd"))
    {

 setActiveTab("add");

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

 const handleLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Admin logout error", error);
  } finally {
    localStorage.clear();
    dispatch(logout());
    dispatch(logoutAdmin());
    dispatch(logoutAccessTK());
    dispatch(clearBagSlice());
    navigate("/users/admin-login");
  }
 }








  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__glow" />
      <div className="admin-sidebar__inner">
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo-shell">
            <img src={XARENA} className="admin-sidebar__logo" alt="X Arena" />
          </div>
          <div>
            <p className="admin-sidebar__eyebrow">Admin Workspace</p>
            <p className="admin-sidebar__brand-title">TechArena Control</p>
            <p className="admin-sidebar__brand-sub">Store operations, catalog flow, and team productivity</p>
          </div>
        </div>

        <div className="admin-sidebar__pulse-card">
          <div className="admin-sidebar__pulse-icon">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="admin-sidebar__pulse-title">Today Focus</p>
            <p className="admin-sidebar__pulse-copy">Review products, update inventory, and publish fresh listings.</p>
          </div>
        </div>

        <div className="admin-sidebar__section-label">Navigation</div>

        <nav className="admin-sidebar__nav">
          {navigationItems.map(({ key, label, hint, icon: Icon }) => (
            <button
              key={key}
              className={`admin-sidebar__item ${activeTab === key ? "admin-sidebar__item--active" : ""}`}
              onClick={() => handleRoutes(key)}
            >
              <div className="admin-sidebar__item-icon">
                <Icon size={18} />
              </div>
              <div className="admin-sidebar__item-content">
                <span className="admin-sidebar__item-label">{label}</span>
                <span className="admin-sidebar__item-hint">{hint}</span>
              </div>
              <ChevronRight size={16} className="admin-sidebar__item-arrow" />
            </button>
          ))}

          <button className="admin-sidebar__item admin-sidebar__item--muted" type="button">
            <div className="admin-sidebar__item-icon">
              <Settings size={18} />
            </div>
            <div className="admin-sidebar__item-content">
              <span className="admin-sidebar__item-label">Settings</span>
              <span className="admin-sidebar__item-hint">Configuration coming soon</span>
            </div>
            <span className="admin-sidebar__badge">Soon</span>
          </button>
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__profile-card">
            <div className="admin-sidebar__profile-avatar">A</div>
            <div>
              <p className="admin-sidebar__profile-name">Admin Panel</p>
              <p className="admin-sidebar__profile-role">Secure management access</p>
            </div>
          </div>
          <button className="admin-sidebar__item admin-sidebar__item--ghost" onClick={handleLogout}>
            <div className="admin-sidebar__item-icon">
              <LogOut size={18} />
            </div>
            <div className="admin-sidebar__item-content">
              <span className="admin-sidebar__item-label">Logout</span>
              <span className="admin-sidebar__item-hint">End current admin session</span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default SideBarAdDashboard
