// import React from 'react';
// import Footer from "../components/Footer.js";
// import Header from "../components/HeaderChange.js"
// import { useSelector, useDispatch } from 'react-redux';
// import axios from "axios";
// import {BASE_URL} from "../config/config.js";
// import {useEffect,useState} from "react";
// import { refreshToken,fetchUserID} from '../store/dataSlice.js';


// function Orders() {

//   const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
//    const { token, status,errorAccess  } = useSelector((state) => state.userAuth);

//    const dispatch=useDispatch();
//    const [orderData,setOrderData]=useState([]);

//     //   useEffect(()=>{
  
//     //   if(!token)
//     //   {
  
//     // console.log("hello this is my world refreshToken");
//     // dispatch(refreshToken());
  
//     //   }
  
//     // //  return;
  
  
//     //   },[])


//   // useEffect(()=>{

//   //   if(!UserID)
//   //   {
//   //    dispatch(fetchUserID(token));
//   //   }




//   // },[])

//   useEffect(() => {
//     // Fetch user ID when the component mounts  

//     const fetchOrderedData=async()=>{


//       try{

//         if(!UserID)
//         {
//           return;
//         }

//         console.log("here is UserID",UserID);
//         const response = await axios.post(`${BASE_URL}/users/fetch-Ordered-data`, {UserID})

//         setOrderData(response.data.orders);
//         // console.log("here is my Ordered Data",orderData);



//       }catch(err)
//       {
//         console.log("something wrong here...!",err);
//       }



//     }

//     fetchOrderedData();




//   }, [UserID]);



// console.log("here is my Ordered Data",orderData);




//   return (

//     <>

//     <Header/>

//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 pt-28 pl-6 pr-6 pb-6 flex flex-col items-center justify-center md:pt-36 ">

//      <div className="myOrderText p-3">

// <p className="text-3xl">My Order's</p>

//   </div>

//      <div className="w-full max-w-6xl h-[79vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
 
//   {/* Scrollable Left Section */}
//   <div className="w-full md:w-2/3 overflow-y-auto p-4 space-y-4">
//     {orderData?.map((order,i) => (
//       <div key={i} className="flex items-center gap-4 bg-gray-100 rounded-xl p-4 shadow-sm">
      
//         <img
//           className="w-20 h-20 object-cover rounded-lg"
//           src="https://hips.hearstapps.com/hmg-prod/images/iphone-16-vs-16-pro-lead-673344dae598a.jpg?crop=0.669xw:1.00xh;0.150xw,0&resize=1200:*"
//           alt="iPhone 16 Pro"
//         />
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">Order ID:-{order.orderID}</h2>
//           <p className="text-sm text-green-600 font-medium mt-1">Status: Ordered</p>
//         </div>
//       </div>
//     ))}
//   </div>

//   {/* Static Right Section */}
//   <div className="w-full md:w-1/3 bg-gradient-to-r from-indigo-400 to-green-500 text-white p-6 flex flex-col justify-evenly rounded-b-2xl md:rounded-r-2xl md:rounded-b-none">
//     <h3 className="text-2xl font-semibold mb-4 text-center">Total Purchase History</h3>
//     <div>
//       <p className="text-4xl font-bold mb-2">$2500</p>
//       <p className="text-sm">Thank you, our happy customer, for purchasing from our platform! 😊</p>
//     </div>
//   </div>
// </div>

//     </div>
// <Footer/>
//     </>
//   );
// }

// export default Orders;









import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer.js";
import Header from "../components/HeaderChange.js";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { BASE_URL } from "../config/config.js";
import { refreshToken, fetchUserID } from '../store/dataSlice.js';

function Orders() {
  const { UserID } = useSelector((state) => state.fetchID);
  const { token } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch ordered data when UserID is available
  useEffect(() => {
    const fetchOrderedData = async () => {
      if (!UserID) return;

      try {
        const response = await axios.post(`${BASE_URL}/users/fetch-Ordered-data`, { UserID });
        setOrderData(response.data.orders);
      } catch (err) {
        console.log("Error fetching orders:", err);
      }
    };

    fetchOrderedData();
  }, [UserID]);

  // Optional: Ensure UserID and token are always available
  // useEffect(() => {
  //   if (!token) dispatch(refreshToken());
  // }, [token, dispatch]);

  // useEffect(() => {
  //   if (!UserID) dispatch(fetchUserID(token));
  // }, [UserID, token, dispatch]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 pt-28 pl-6 pr-6 pb-6 flex flex-col items-center justify-center md:pt-36">
        <div className="myOrderText p-3">
          <p className="text-3xl">My Orders</p>
        </div>

        <div className="w-full max-w-6xl h-[79vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Scrollable Left Section */}
          <div className="w-full md:w-2/3 overflow-y-auto p-4 space-y-4">
            {orderData.length === 0 ? (
              <p className="text-center text-gray-500">No orders found.</p>
            ) : (
              orderData.map((order, i) => (
                <div
                  key={i}
                  onClick={() => handleOrderClick(order)}
                  className="flex items-center gap-4 bg-gray-100 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-200 transition"
                >
                  <img
                    className="w-20 h-20 object-cover rounded-lg"
                    src={order.products[0]?.productId?.product_image || 'https://via.placeholder.com/80'}
                    alt={order.products[0]?.productId?.product_name || 'Product Image'}
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Order ID: {order.orderID}</h2>
                    <p className="text-sm text-green-600 font-medium mt-1">Status: {order.status}</p>
                    <p className="text-sm text-gray-600">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Static Right Section */}
          <div className="w-full md:w-1/3 bg-gradient-to-r from-indigo-400 to-green-500 text-white p-6 flex flex-col justify-evenly rounded-b-2xl md:rounded-r-2xl md:rounded-b-none">
            <h3 className="text-2xl font-semibold mb-4 text-center">Total Purchase History</h3>
            <div>
              <p className="text-4xl font-bold mb-2">₹2500</p>
              <p className="text-sm">Thank you, our happy customer, for purchasing from our platform! 😊</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for showing selected order details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-2xl rounded-xl p-6 shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-xl font-bold text-gray-500 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Order ID: {selectedOrder.orderID}</h2>
            <p className="mb-2 text-gray-600">Order Date: {new Date(selectedOrder.orderDate).toLocaleString()}</p>
            <p className="mb-4 text-green-600 font-medium">Status: {selectedOrder.status}</p>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {selectedOrder.products.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-100 p-3 rounded-xl">
                  <img
                    src={item.productId?.product_image || 'https://via.placeholder.com/60'}
                    alt={item.productId?.product_name || 'Product'}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.productId?.product_name}</h3>
                    <p className="text-gray-700">Price: ₹{item.productId?.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Orders;
