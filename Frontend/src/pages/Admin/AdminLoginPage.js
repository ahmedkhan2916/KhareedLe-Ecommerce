import React, { useEffect, useState } from "react";
import "../../assets/Style/adminLogin.css";
import Arena3 from "../../assets/images/HeaderLogos/arena3.png"
import { loginAdmin, LoginAdmin } from "../../store/dataSlice.js"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
function AdminLoginPage() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")

    const dataAdmin=useSelector((state) => state?.authAdmin?.admin?.message);
    const dispatch=useDispatch();
      const navigate=useNavigate();


    useEffect(()=>{


        if(dataAdmin==="Login successful!")
        {
            alert("Login successful!");
            navigate("/users/admindash");
        }


    },[dataAdmin])



    const handleAdminLogin=async (e)=>{


        e.preventDefault();
        

        if(!email || !password)
        {
            alert("sorry credentials are empty...");
            return
        }




        else{

               const bodyData={
      
        EMAILORPHONENO:email,
        password:password,

    }

   dispatch(loginAdmin(bodyData))
  .unwrap()
  .then((res) => {
    console.log("LOGIN SUCCESS:", res);
  })
  .catch((err) => {
    console.error("LOGIN ERROR:", err);
  });

            


        }







    }


   const handleAdminEmail=(e)=>{


        const value=e.target.value;

        console.log(value);

        if(value==="")
        {

        setEmail("");
            return;


        }

        else{
            
            setEmail(value);
        }




    }




       const handleAdminPassword=(e)=>{


        const value=e.target.value;

        console.log(value);

        if(value==="")
        {

        setPassword("");
            return;


        }

        else{
            
            setPassword(value);
        }




    }









console.log("here is admin dataaaaaa",dataAdmin)


  return (
    <div className="admin-login">
      <div className="admin-login__bg">
        <div className="admin-login__grid" />
        <div className="admin-login__glow admin-login__glow--a" />
        <div className="admin-login__glow admin-login__glow--b" />
        <div className="admin-login__scanline" />
      </div>

      <div className="admin-login__card">
        {/* Left Section */}
        <div className="admin-login__left">
          <div className="admin-login__left-inner">
            <div className="admin-login__badge">Admin Access</div>
            <img className="xArenaLogo admin-login__logo" src={Arena3} alt="X Arena" />
            <h1 className="admin-login__title">
              Command The Storefront
              <span className="admin-login__title-accent"> With X Arena</span>
            </h1>
            <p className="admin-login__subtitle">
              Control inventory, dispatch orders, and monitor live sales with an
              advanced admin workspace built for speed and clarity.
            </p>
            <div className="admin-login__stats">
              <div>
                <p className="admin-login__stat-label">Realtime Sync</p>
                <p className="admin-login__stat-value">99.9%</p>
              </div>
              <div>
                <p className="admin-login__stat-label">Store Nodes</p>
                <p className="admin-login__stat-value">24</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="admin-login__right">
          <div className="admin-login__form-shell">
            <div className="admin-login__form-header">
              <p className="admin-login__eyebrow">Secure Gateway</p>
              <h2>Admin Login</h2>
              <p className="admin-login__helper">Sign in to continue to the dashboard.</p>
            </div>

            <form className="admin-login__form" onSubmit={handleAdminLogin}>
              <label className="admin-login__field">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="admin@xarena.com"
                  value={email}
                  onChange={(e)=>handleAdminEmail(e)}
                  required
                />
              </label>

              <label className="admin-login__field">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e)=>handleAdminPassword(e)}
                  value={password}
                  required
                />
              </label>

              <button type="submit" className="admin-login__submit">
                Enter Control Room
              </button>

              <p className="admin-login__footnote">
                Authorized personnel only · Access is monitored
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
