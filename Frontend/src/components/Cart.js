import { useState,useEffect} from "react";
import { fetchID } from "../Services/apiService";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cart from "../assets/images/HeaderLogos/cart.png";
import { showTotalFuncHeader } from "../Services/apiService.js";
import { increment, fetchBagData,refreshToken,fetchUserID} from '../store/dataSlice.js';
import { use } from "react";


const Cart = () => {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const numberItem=useSelector(state=>state.counter.value);
    const [numberCartTotal,setNumberCartTotal]=useState(0);
    const [UID,setID]=useState("");
    const [total,setTotal]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const bag = useSelector(state => state.bag.data);
    const loading = useSelector(state => state.bag.loading);
     const errorBagFetch = useSelector(state => state.bag.error);
    
    const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
    const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
    const { totalBag,statusTotalBag,errorBagTotal,}=useSelector((state)=>state.fetchBagTotalStore);

    
    console.log("UserID from redux",UserID);


    console.log("this is total bag data",totalBag);



    //   useEffect(()=>{
    
    //  if(token===null)
    //  {
    
    //   dispatch(refreshToken());
    //   // dispatch(fetchBagData(UserID));
    
    //  }

    //  console.log("token coming here",token)
    
      
    
    
    //     },[])


      

        
  //    useEffect(() => {
  //   if (token) {
  //     dispatch(fetchUserID(token));
  //   }
  // }, [token]);




    


   useEffect(() => {
    const updateCartTotal = async () => {
      if (!bag || bag.length === 0 || !UserID) {
        setNumberCartTotal(0);
        return;
      }

      try {
        const response = await axios.post("https://khareedle-ecommerce.onrender.com/users/showtotal", { userId: UserID });
        console.log("this is response from show total",UserID);
        setNumberCartTotal(response.data.totalQuantity);
      } catch (error) {
        console.error("Error fetching cart total:", error);
      }
    };

    updateCartTotal();
  }, [bag, UserID]);


  

  // useEffect(()=>{

  //   const totalCartFetch=async()=>{
  //      let totalCart=await axios.post("http://localhost:1000/users/showtotal",{userId:UserID});
  //       // console.log("this is total cart items",totalCart.data.totalQuantity);
  //       //  alert("updated")
  //       setNumberCartTotal(totalCart.data.totalQuantity);
  //   }

  //   totalCartFetch();

  // },[numberCartTotal])
    

    useEffect(()=>{


        const InitialCartSetup=async()=>{

          console.log("this is token",token);
          if(!token || !UserID)return "yes i am returning from here";

      
        // const ID=await fetchID(token);
      
        // const Ids={userId:ID,productId:localStorage.getItem("productID")};
      
        let totalCart=await axios.post("https://khareedle-ecommerce.onrender.com/users/showtotal",{userId:UserID});
        // console.log("this is total cart items",totalCart.data.totalQuantity);
        //  alert("updated")
        setNumberCartTotal(totalCart.data.totalQuantity);
        dispatch(increment(totalCart.data.totalQuantity));
        
        }
      
        InitialCartSetup();
      },[numberItem , token , bag,UserID])

    

      useEffect(()=>{
  
  
      const showTotalFunc=async()=>{
  
        // console.log("this is ID CALLING Before Encryption",userDetail);
      if(!token || !UserID)
        {
          return; 
        }
      const ID=UserID
  
      if(!ID)
      {
        return ;
      }
  
      setID(ID);
      
      console.log("this is ID CALLING",ID);
      const totalCart=await showTotalFuncHeader(ID);
      console.log("i am callinggggggggggggggg",totalCart)
    
      setTotal(totalCart);
  
      console.log("this is state calling",total);
     
  
       
        }
  
        showTotalFunc();
  
      },[UserID]);

// Function to proceed to buy

  const proceedToBuy = async() => {
    // Your normal buying logic
    console.log("Proceeding to buy...");
    try{
    // const bagData=await axios.post('http://localhost:1000/users/fetchbag',{UID:UID});
    
    console.log("UIDz")
    // const ID = await fetchID(token);
    // await dispatch(fetchBagData(UserID));
   
    
    //    if(Object.keys(bag).length===0)
    // {

    //   console.log("Bag is empty, fetching data...");
    //   alert("empty bag")

    // }
        
    // console.log("this is bag data bro",bag.data.bagItems);
    // localStorage.setItem("bagItem",JSON.stringify(bag.bagItems));

    navigate("/users/Cart");
    }
    catch(error)
    {
      return error;
    }
  };

 console.log("token coming here",token)

     const handleCartRoute=async()=>{
  
        // console.log("hiii baby",userIdStorage);
        // console.log("userID here in cart",userId)
        // const userId= await fetchID(detail);
        try{
    //   if(!token)
    // {
    //   dispatch(refreshToken());
    // }
            //FIX TOKEN LOGIC:- TOKEN IS ERASING WHILE REFRESHING THE PAGE
            if (!token) {
                setShowLoginModal(true); // Show the modal
                return
              } 
              else
               
              {
                
                proceedToBuy();

              }
  
        // console.log("this is UID MY",UID);
      
      
    
    }
    catch(error)
        {
          return console.error("this is error in buy button",error)
            
         }
  
      };

  
    const handleLoginRedirect = () => {
        const currentPath = window.location.pathname; // Get current page URL
        window.location.href = `/users/login?redirect=${encodeURIComponent(currentPath)}`; 
      };
      // Redirect to login

      console.log("token in Cart",token,totalBag);



  return (
    <>
      <div className={`Items2 flex rounded-full items-center w-max pl-4 pr-4 hover:bg-green-100 sm:flex`}  onClick={handleCartRoute}>
                 <div className="relative bottom-5 left-5 bg-green-500 rounded-full p-1">             
                    <h2 className="text-white text-xs">
                     
                    {
  totalBag || 0
}

                     
                     </h2>
   
   
                    </div>
                   
                   <img className='rightHeaderLogo h-5 ' src={cart}></img>
                   <p className='headerText pl-2 tracking-tight'>Cart</p>
   
               </div>

      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center
  transition-all ease-in-out duration-400 bg-black bg-opacity-50 backdrop-blur-sm
  ${showLoginModal ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'} 
`}>

  <div className="bg-white p-6 rounded-lg text-center space-y-4">
    <h2 className="text-xl font-bold">Login Required</h2>
    <p>Please login to continue shopping.</p>
    <div className="flex justify-center gap-4">
      <button onClick={handleLoginRedirect} className="bg-green-500 text-white px-4 py-2 rounded">
        Login
      </button>
      <button onClick={() => setShowLoginModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
        Cancel
      </button>
    </div>
  </div>
</div>


    </>
  );
};

export default Cart;
