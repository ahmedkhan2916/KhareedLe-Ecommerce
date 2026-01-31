import React, { useEffect, useState } from "react";
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

    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-[90%] max-w-6xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex">

        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-green-800 text-white items-center justify-center px-12">
          <div>
            <img className="xArenaLogo" src={Arena3} alt="imageTag"/>
            <h1 className="text-4xl font-bold leading-tight text-green-50">
              Start Your Selling Journey With X ARENA
            </h1>
            <p className="mt-4 text-sm text-white max-w-md">
              Manage products, track orders, analyze sales, and scale your
              business with a powerful admin dashboard.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-slate-50 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Admin Login
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to continue
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleAdminLogin}>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e)=>handleAdminEmail(e)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e)=>handleAdminPassword(e)}
                value={password}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />

              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Login
              </button>

              <p className="text-xs text-center text-slate-400">
                Authorized personnel only
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminLoginPage;
