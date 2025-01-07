import React, { useEffect } from 'react'
import { useState } from 'react';
// import "../assets/styles/mainStyle.css"
// import { useContext } from 'react';
// import { BackgroundColorContext } from './BackgroundColorContext.js';
import {useNavigate} from "react-router-dom";
import Search from "../assets/images/Search.png";
import "../assets/Style/navbarStyle.css"
import { useDispatch ,useSelector} from 'react-redux';
import { increment, setStatusCode } from '../store/dataSlice.js';
import headset from "../assets/images/HeaderLogos/headset.png";
import web from "../assets/images/HeaderLogos/web.png";
import cart from "../assets/images/HeaderLogos/cart.png";
import user from "../assets/images/HeaderLogos/user.png";
import arrayDown from "../assets/images/HeaderLogos/down.png"
import menu from "../assets/images/HeaderLogos/menu-burger.png"
// import MobileSidebar from '../layout/MobileSidebar.js';
import axios from 'axios';
import logout from "../assets/LoginLogos/logout.png"
import khareedLe from "../assets/images/HeaderLogos/khareedLe.png";
import { setProducts } from '../store/dataSlice.js';
import { fetchData } from '../store/dataSlice.js';
import Cookies from "universal-cookie";


function Header() {

// all header content is here:-

// const { bgColor, changeBackgroundColor } = useContext(BackgroundColorContext);
    const cookie=new Cookies();
    const dispatch = useDispatch();
    const status=useSelector((state)=>state.status.status);
    const [cartItems,setCartItems]=useState(localStorage.getItem("cartItems"))
    const userId = useSelector(state=>state.userId.userId);
    const numberItem=useSelector(state=>state.counter.value);
    console.log("this is total item",numberItem);
    // const cartItem=useSelector(state=>state.counter)
    const [isDropDownOpen,setIsDropDownOpen]=useState(false);
    const userN=useSelector((state)=>state.username.username);
    // const [inputData,setInputData]=useState("");
    const [searchQuery,setSearchedQuery]=useState([]);
    const [hideSearchBar,sethideSearchBar]=useState("hidden");
    const [dataComing,setDataComing]=useState(localStorage.getItem("data"));
    const [userIdStorage,setUserIdStorage]=useState(localStorage.getItem("userID"));
    const [total,setTotal]=useState(null);
    // const userId = useSelector(state=>state.userId.userId);

    console.log("this is numberItems",numberItem);
    
    localStorage.setItem('totalNumbers',numberItem);
    const itemFetch = localStorage.getItem('totalNumbers');
    console.log(cookie.get("productName"));

    useEffect(()=>{


      const showTotalFunc=async()=>{

     let totalCart=await axios.post("http://localhost:1000/users/showtotal",{userId:userIdStorage});
     console.log(totalCart.data.totalQuantity);
     setTotal(totalCart.data.totalQuantity);
     
     
      }

      showTotalFunc();

    },[numberItem]);

    useEffect( () => {
     
      if (!userId) {
        console.error("userId is missing or undefined in Redux.");
        return; // Stop if userId is invalid
      } 
   
      const fetchUserItemsData = async () => {
        try {

          const response = await axios.post(`http://localhost:1000/users/showtotal`,{userId});
          localStorage.setItem("data",response.data.totalQuantity)
          console.log(response.data.totalQuantity);
          setDataComing(localStorage.getItem("data"));

        } catch (error) {
          console.error("Error fetching total items:", error);
        }
      };
    
      fetchUserItemsData();
    }, [numberItem]);
    


    if(status==true)
    {
      localStorage.setItem("status",status);
      localStorage.setItem("username",userN);
    }
   
    const Item=localStorage.getItem("status");
    const Username=localStorage.getItem("username");
    
   
  
  const navigate=useNavigate();

  const handleSubmit=async (req,res)=>{

    navigate("/users/login")
   
  }




const handleMouseEnter=()=>{

    setIsDropDownOpen(true);

}

  const handleMouseExit=()=>{


    setIsDropDownOpen(false);


  }

  const handleSearchInput=async(e)=>{


    // e.preventDefault;
    const inputValue=e.target.value;

    if(inputValue.trim()==0)
    {
      dispatch(setProducts({}));
      setSearchedQuery([]);
      sethideSearchBar("hidden");
      return;
    }
    else{
      sethideSearchBar("flex");
    }

   const searchedQuery = await axios.get(`http://localhost:1000/users/userSearch?name=${inputValue}`);

   console.log(searchedQuery);

   if(searchedQuery.data.length==0)
   {

    setSearchedQuery({});
    return;
    
   }
  
   setSearchedQuery(searchedQuery.data.searchedItems);
   dispatch(setProducts(searchQuery));

  }


  const handleLogout=()=>
  {
    // console.log(userId);
    // dispatch(increment(0));
    dispatch(setStatusCode(false));
    localStorage.clear();
    // sessionStorage.clear();
    navigate("/users/login");

  }

  const handleCartRoute=async()=>{

    console.log("hiii baby",userIdStorage);

    const bagData=await axios.post('http://localhost:1000/users/fetchbag',{userIdStorage});

    console.log("this is bag data bro",bagData.data.bagItems);
    localStorage.setItem("bagItem",JSON.stringify(bagData.data.bagItems));

    navigate("/users/shipping");


  }


    const Items=[

        {id:1,label:"Products",showDropDown:true},
        {id:2,label:"Start selling",showDropDown:true},
        {id:3,label:"Tools and apps",showDropDown:true},
        {id:4,label:"Pricing",showDropDown:true},
        {id:5,label:"Resources",showDropDown:true},
        {id:6,label:"Pro sellers",showDropDown:false},
        {id:7,label:"GelatoConnect",showDropDown:true}

    ]


    const [dropdown,setDropdown]=useState("hidden");
    const [dropdownBottom,setDropdownBottom]=useState(null);
    const [sideBar,setSidebar]=useState(false);


    const handleDropdown=()=>{
   
        console.log("yes");

        if(dropdown=="hidden")
        {
        setDropdown("flex");
        // changeBackgroundColor("	#C0C0C0");
        
    //   document.body.style.backgroundColor="gray";
        document.body.style.backgroundColor="rgba(191, 191, 191)";
       const target= document.getElementById("ZINDEX");

       target.style.zIndex="2000";
       

        }
        else{

            setDropdown("hidden");
            document.body.style.backgroundColor="white";
            // changeBackgroundColor("white")
        }
    }

    const handleBottomHeader=(id)=>{

      setDropdownBottom(id);

    }

    const handleMouseleave=()=>{

        setDropdownBottom(null)

    }

    const handleSidebar=()=>{

        setSidebar(!sideBar);
      
        if(sideBar===true)
        {
          document.body.style.backgroundColor="white";
        //   changeBackgroundColor("white")
          
        }
        else{
          
          document.body.style.backgroundColor="#C0C0C0";
        //   changeBackgroundColor("#C0C0C0")

          
      
        }
      
      }


      const handleRoute=(id)=>{
        
          if(!id)
          { return console.log("id is showing undefined");}
        
        console.log(id);
      dispatch(fetchData(id));
      return navigate(`/product`);




      }

  return (
    <div className={` headerContainer h-20 `} >

<div
        className={`fixed inset-y-0 left-0  bg-white  transform transition-transform duration-300 ease-in-out z-20 ${
          sideBar ? 'translate-x-0' : '-translate-x-full'
        }`}
         >
        {/* <MobileSidebar handleSidebar={handleSidebar} /> */}
      </div>

    <div className='headerItemsContainer flex  justify-around h-full items-center  ' >
        <div className='imageContainer   flex items-center rounded-full' >

        <div className='hamburgureMenuSideBar xl:hidden flex'  onClick={handleSidebar}>

<img src={menu} className='h-5 pr-7' ></img>


</div>
            <img src={khareedLe} className='logoHeader h-20 cursor-pointer' onClick={()=>navigate("/")}></img>

        </div>

        <div className='rightItemContainer text-sm flex w-fit  '>
            <div className='Items2 flex rounded-full items-center w-max lg:pl-4 pr-4 md:flex hidden cursor-pointer hover:bg-green-100'>
                <img className='rightHeaderLogo h-5' src={headset}></img>
                <p className='headerText pl-2 tracking-tight text-sm'>Contact us</p>
            </div>

            <div className='Items2 flex rounded-full items-center w-max pl-4 pr-4  relative cursor-pointer hover:bg-green-100 lg:flex hidden' onClick={handleDropdown} id="ZINDEX">
                <img className='rightHeaderLogo h-5' src={web}></img>
                <p className='headerText pl-2 tracking-tight' >IN/INR</p>
                <img src={arrayDown} className='h-4 pl-2'></img>

                <div className={`dropdown  absolute top-12 z-10 ${dropdown} flex-col  h-24 bg-white rounded-lg justify-center items-center `} >
                <div className='arrow-up'></div>
                    <button className='btndropdown p-2 tracking-tight rounded-lg  w-fit'>Language-IN</button>
                    <button className='btndropdown p-2 tracking-tight rounded-lg  w-fit'>Currency-INR</button>

                </div>
            </div>


            <div className='Items2 flex rounded-full items-center w-max pl-4 pr-4 md:flex hidden cursor-pointer hover:bg-green-100'  onClick={handleCartRoute}>
              <div className="relative bottom-5 left-5 bg-green-500 rounded-full p-1">             
                 <h2 className="text-white text-xs">
                  
                  {

                    total

                  }
                  
                  </h2>


                 </div>
                <img className='rightHeaderLogo h-5' src={cart}></img>
                <p className='headerText pl-2 tracking-tight'>Cart</p>
            </div>

            {/* <div className='Items2 flex rounded-full items-center w-max pl-4 pr-4 lg:flex hidden cursor-pointer hover:bg-green-100'>
                <img className='rightHeaderLogo h-5' src={user}></img>
                <p className='headerText pl-2 tracking-tight'>Sign in</p>
            </div> */}

            <div className='searchBar flex items-center w-4/12 '>
  
      <input type="text" className='inpSearch pl-7 inputNav rounded-lg border-solid border-black w-56 text-2xl ' onChange={handleSearchInput}></input>

     <div className={`dropdownMenu absolute top-16 bg-gray-50 rounded-md w-56
      h-72  ${hideSearchBar}  justify-center`}>

<>
  {searchQuery.length > 0 ? (
    
   
    <ul className='block listProfile2 pt-3'>
      {searchQuery.map((company) =>{
      console.log("Company ID: ", company._id);
      
     return (
        <li key={company._id} className='text-xl mt-2 border-solid border-red-500 hover:cursor-pointer' onClick={()=>handleRoute(company._id)}  >{company.product_name}</li>
      )})}
    </ul>
  ) : (
    <div></div>
  )}
</>
</div>

      <img src={Search} className='w-7 absolute'></img>
      
      </div>

        {/* <button className='buttonHeader bg-black rounded-full text-white pb-2 pt-2 pl-4 pr-4 ml-3 hover:text-gray-300'>Sign up for free </button> */}

        </div>

        <div className="login flex items-center flex-col justify-center cursor-pointer relative"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>

{ Item ? (
  <>
<div className='loginLogo'></div>
<span>{Username}</span>
</>
)
:
(
<>

   <div className='loginLogo'></div>
<button className="loginBtnNav bg-yellow-200 w-20 rounded mt-1" onClick={handleSubmit}>Login</button>

</>
)}    



{

Item&&isDropDownOpen&&(

<div className="dropdownMenu absolute top-16 bg-gray-50 rounded-md w-48
h-72  flex justify-center">
<ul className='listProfile pt-3'>

<li className='listProfile pt-1 text-xl'>Orders</li>
<li className='listProfile pt-1 text-xl'>Wishlist</li>
<li className='listProfile pt-1 text-xl'>Gifts</li>
<li className='listProfile pt-1 text-xl flex' onClick={handleLogout}> Logout <img src={logout} className="h-6 pl-1"></img>
</li>

</ul>
</div>


)

}

</div>


    </div>



{/* bottom item header */}

<div className='bottomItemHeaderContainer headerContainer flex justify-center  h-12 xl:flex hidden' >

<div className='allItemsContainer w-3/4 h-full flex'>

{

   Items.map((item)=>( 
    
    
    
    <div className='Items2 flex relative items-center w-max h-full  lg:pl-4 pr-4 cursor-pointer' onMouseEnter={()=>handleBottomHeader(item.id)} onMouseLeave={handleMouseleave}>
               
    <p className='headerText pl-2 tracking-tight text-sm'>{item.label}</p>
    <div className='arrowContainer flex justify-center items-center ml-1 '>
    <img src={arrayDown} className={`${item.showDropDown?"block" : 'hidden'} arrayDownHeader h-4 ${item.showDropDown&& dropdownBottom===item.id ? 'rotate-180' : 'rotate-0' }  hover:transition-transform duration-500 ease-in-out`} ></img>
    </div>

    <div className={`dropdown absolute top-12 left-0 right-0 ${item.showDropDown&& dropdownBottom===item.id ? 'flex' : 'hidden'} flex-col w-72  bg-white justify-center items-center`} >

<div className='arrow-up'></div>

<div className='dropDownItemsBox  w-11/12 flex justify-between h-16'>
<button className=' pl-6 tracking-tight rounded-lg  w-fit text-sm '>BestSellers</button>
<img src={arrayDown} className={`rotateItemImage h-4 pr-6 mt-2 `}></img>
</div>

<div className='dropDownItemsBox  w-11/12 flex justify-between h-16'>
<button className=' pl-6 tracking-tight rounded-lg  w-fit text-sm '>BestSellers</button>
<img src={arrayDown} className={`rotateItemImage h-4 pr-6 mt-2 `}></img>
</div>


<div className='dropDownItemsBox  w-11/12 flex justify-between h-16'>
<button className=' pl-6 tracking-tight rounded-lg  w-fit text-sm '>BestSellers</button>
<img src={arrayDown} className={`rotateItemImage h-4 pr-6 mt-2 `}></img>
</div>



<div className='dropDownItemsBox  w-11/12 flex justify-between h-16'>
<button className=' pl-6 tracking-tight rounded-lg  w-fit text-sm '>BestSellers</button>
<img src={arrayDown} className={`rotateItemImage h-4 pr-6 mt-2 `}></img>
</div>



<div className='dropDownItemsBox  w-11/12 flex justify-between h-16'>
<button className=' pl-6 tracking-tight rounded-lg  w-fit text-sm '>BestSellers</button>
<img src={arrayDown} className={`rotateItemImage h-4 pr-6 mt-2 `}></img>
</div>


<div className='dropDownItemsBox  w-11/12 flex justify-between h-16'>
<button className=' pl-6 tracking-tight rounded-lg  w-fit text-sm '>BestSellers</button>
<img src={arrayDown} className={`rotateItemImage h-4 pr-6 mt-2 `}></img>
</div>


</div>
</div>


))

}
</div>
</div>

    </div>
  )
}

export default Header