import React from "react";
import axios from "axios";
import {useEffect,useState} from "react";
import Minus from "../components/Minus.js";
import Header from "../components/HeaderChange.js";
import DeleteIcon from "../assets/Brandlogo/trash.png"

import { fetchUserID,refreshToken,fetchProductQuantity,fetchBagData } from '../store/dataSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const CartPage = () => {



    const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
        const dispatch = useDispatch();
        const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
        const {qty,qtyStatus,qtyError}=useSelector((state)=>state.fetchProductQty);
         const bagData = useSelector((state) => state.bag.data);
            const loading = useSelector((state) => state.bag.loading);
            const error = useSelector((state) => state.bag.error);
        const [total,setTotal]=useState(0);
        const [signal,setSignal]=useState(false);
        //  const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);



        // Fetch and refresh token once on component mount
useEffect(() => {
  if(!token)
  {
  dispatch(refreshToken());
  }
}, []);

// Fetch UserID ONLY when token is available
useEffect(() => {
  if (token) {
    dispatch(fetchUserID(token));
  }
}, [token]);



useEffect(()=>{

dispatch(fetchBagData(UserID)); 


},[UserID,token,dispatch]);


useEffect(() => {
  
if(loading===null)
{
  setSignal(true);
}
else if(loading===false)
{
  setSignal(false);
}


},[loading])


   const fetchTotalPrice = async () => {
          // Safely get data from localStorage
          // setDataBagData(storedData);
          try {
            
            if(!UserID)
            {
              setTotal(0);
              return;
            }
            // console.log("User ID:", userId);
            console.log("iD User is here",UserID);
            const response = await axios.post("https://khareedle-ecommerce.onrender.com/users/totalprice", {
              UserID
            });
      
            console.log("Total Price:", response.data.Price);
            setTotal(response.data.Price);
          } catch (error) {
            console.error("Error fetching total price:", error);
          }
        };



useEffect(() => {

        const fetchTotalPrice = async () => {
          // Safely get data from localStorage
          // setDataBagData(storedData);
          try {
            
            if(!UserID)
            {
              setTotal(0);
              return;
            }
            // console.log("User ID:", userId);
            console.log("iD User is here",UserID);
            const response = await axios.post("https://khareedle-ecommerce.onrender.com/users/totalprice", {
              UserID
            });
      
            console.log("Total Price:", response.data.Price);
            setTotal(response.data.Price);
          } catch (error) {
            console.error("Error fetching total price:", error);
          }
        };
      
        fetchTotalPrice();
      }, [UserID,bagData]);
      



      const handleRemoveQuantity = async (value,productId) => {
            // Logic to handle removing quantity
           
      try {
        
    await dispatch(fetchProductQuantity({ UserID, productId, value }));
    // Re-fetch updated bag data
    await dispatch(fetchBagData(UserID));
    // Re-fetch updated total price
    fetchTotalPrice(); // call it explicitly
  } catch (err) {
    console.log(err);
  }
};
        

        async function  deleteQuantity(productId)
              {
                
                const ID=UserID;
        
                const IDS={userId:ID , productId:productId};
        
                console.log("this is ids",IDS);
                // const userId=localStorage.getItem("userID");
                const dataDeleted= await axios.post("https://khareedle-ecommerce.onrender.com/users/deletequantity",{ userId: ID,
                  
                productId: productId})
        
                console.log("this is data deleted",dataDeleted);
              
        
                dispatch(fetchBagData(ID)); 
        
            
              }


  const cartItems = [
    {
      id: 1,
      name: "Wireless Earbuds",
      variant: "Black cade",
      price: 9999,
      quantity: 1,
      image: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Smartphone",
      variant: "Midnight color",
      price: 49999,
      quantity: 1,
      image: "https://via.placeholder.com/100"
    },
    {
      id: 3,
      name: "Smartwatch",
      variant: "Space Gray",
      price: 14999,
      quantity: 1,
      image: "https://via.placeholder.com/100"
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  console.log("here length",bagData.length)

  return (
<>
<Header></Header>

  
    <div className="min-h-screen bg-white  pt-28 pl-4 pr-4 pb-4 md:pt-36 pl-8 pr-8 pb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Continue Shopping</h1>
        <span className="text-sm font-medium">{cartItems.length} Items</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Cart Items */}
        <div className="md:col-span-2 grid gap-4">
{
        !bagData || bagData.length === 0 || signal===true ? (<div>Cart is EMPTY...!!!</div>) :

         ( bagData.bagItems?.map(item => (
            <div
              key={item.id}
              className="flex gap-4 items-center p-4 border rounded-2xl shadow-sm"
            >
              <img src={item.productImage}  className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex flex-col gap-1 w-full">
                <span className="font-medium text-lg">{item.productName}</span>
                {/* <span className="text-sm text-gray-500">{item.variant}</span> */}
                <span className="font-semibold text-black mt-1">₹ {item.price.toLocaleString()}</span>
                <div className="mt-2 flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded" value="min" onClick={(e)=> handleRemoveQuantity(e.target.value,item.productId)}>-</button>
                  {/* <Minus></Minus> */}
                  {/* <span>{qtyStatus==='succeeded'?qty:qty?.Status}</span> */}
                  <span>{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded" value="add" onClick={(e)=> handleRemoveQuantity(e.target.value,item.productId)}>+</button>
                </div>
              </div>

   <div className='deleteCardButton flex items-center' onClick={() => deleteQuantity(item.productId)}>
        
                    {/* <h1 className='text-sm font-normal'>Delete</h1> */}

                    <img src={DeleteIcon} className='h-4'></img>
        
                </div>

            </div>
          )))}

          {/* Surprise Gift Section */}
          <div className="p-4 border rounded-2xl shadow-sm bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">🎁 Surprise Gift Inside!</h2>
              <p className="text-sm text-gray-500">Reveal at Checkout 🚀<br />Fast delivery & a little surprise!</p>
            </div>
            <div className="w-16 h-16 bg-gray-300 rounded-xl blur-sm"></div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 border rounded-2xl shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Delivery</span>
            <span className="text-green-500 font-medium">Free</span>
          </div>
          <div className="flex justify-between font-semibold text-base border-t pt-2">
            <span>Total</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>

          <input
            type="text"
            placeholder="Apply coupon"
            className="mt-4 w-full px-3 py-2 border rounded-lg text-sm"
          />

          <button className="mt-4 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition">
            ⚡ Checkout
          </button>
        </div>
      </div>

      {/* Sticky Bottom Summary for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center">
        <div>
          <p className="text-sm">{cartItems.length} Items</p>
          <p className="font-semibold">₹ {subtotal.toLocaleString()}</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg">Checkout</button>
      </div>
    </div>

     </>
  );
 
};

export default CartPage;
