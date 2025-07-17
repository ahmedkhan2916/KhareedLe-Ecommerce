// import React, { useState } from "react";
// import Header from "../components/HeaderChange.js";
// import "../assets/Style/payment.css"
// import "../assets/Style/Headings.css"
// import axios from "axios";
// import { useNavigate } from 'react-router-dom'; 

// function PaymentGateway() {
//   const [selectedPayment, setSelectedPayment] = useState(""); // To track selected payment method
//   const [codDetails, setCodDetails] = useState("COD Fee will be Charged by ₹80"); // COD-specific details
//   const [debitDetails,setDebitDetails]=useState({cardnumber:"",username:"",validation:"",cvv:""})
//   const [counter,setCounter]=useState(0);
//   const navigate=useNavigate();

//   const handlePaymentSelect = (e) => {
//     setSelectedPayment(e.target.value);
//   };

// //   const handleCodDetailsChange = (e) => {
// //     setCodDetails({ ...codDetails, [e.target.name]: e.target.value });
// //   };

// const handleCongrats=()=>{

//   navigate("/users/completed");

// }



// const handleDebitDetails=(e)=>{

//   const {name,value}=e.target;

   
//   if(name==='validation')
//  {
//         const sanitization=value.replace(/[^0-9]/g, "");
        
//         if(sanitization.length>4)
//         {
//             return;
//         }

//         if(sanitization.length>2)
//         {

//             setDebitDetails({...debitDetails,[name]:sanitization.slice(0,2)+"/"+sanitization.slice(2)})

//         }
//         else{
//             setDebitDetails({...debitDetails,[e.target.name]:sanitization});
//          }


//  }


//   else if(name==="cvv")
//  {

  
//     if(value.length < 4)
//     {
//     setDebitDetails({...debitDetails,[e.target.name]:e.target.value});
//     }

//     else{
//         return
//     }
//  }


//  else if(name==="cardnumber")
//     {
   
     
//        if(value.length < 17)
//        {
//        setDebitDetails({...debitDetails,[e.target.name]:e.target.value});
//        }
   
//        else{
//            return
//        }
//     }


//  else{
//     setDebitDetails({...debitDetails,[e.target.name]:e.target.value});
//  }

 


// }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Selected Payment Method:", selectedPayment);
//     if (selectedPayment === "cod") {
//       console.log("COD Details:", codDetails);
//     }
//   };










//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//   const res = await loadRazorpayScript();
//   if (!res) {
//     alert("Failed to load Razorpay SDK");
//     return;
//   }

//   try {
//     // ✅ Correct axios POST
//   const response = await axios.post(
//   "http://localhost:1000/users/create-order",
//   { amount: 65000 }, // ✅ This is the actual request body
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
// );

// const orderData = response.data

// console.log("orderData",orderData);
//     const options = {
//       key: "rzp_test_bEM9BDCRfFjxoi", // Razorpay Test Key
//       amount: orderData.amount,
//       currency: "INR",
//       name: "Khareed Lay",
//       description: "Khareed Lay - Big Electronics E-Commerce Platform in India",
//       order_id: orderData.id,
//       handler: function (response) {
//         alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
//         // Optionally verify with backend here
//       },
//       prefill: {
//         name: "Ahmed",
//         email: "Ahmedkhandelhi123@gmail.com",
//         contact: "8882066763",
//       },
//       theme: {
//         color: "#28a745",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     console.error("Payment Error:", err);
//     alert("Payment failed or server unreachable.");
//   }
// };

//   return (
//     <>
   
//    <Header></Header>
 
//     <div className="payment-container flex flex-row items-center justify-between h-screen  bg-gray-200 pt-28">

//         <div className="ImageSideDesign h-full -ml-36 w-1/3 rounded-r-full">


//         </div>
//         <div className="textContainerPayment">
//       <h1 className="PaymentHeading text-3xl font-bold mb-6 HeadingPlayFai text-white">Select Your Payment Method</h1>
//       </div>
//       <form onSubmit={handleSubmit} className="formContainerPayment w-96 p-6 mr-8 bg-transparent shadow-green-300 shadow-lg rounded-lg">
//         {/* Dropdown to Select Payment Method */}
//         <label htmlFor="payment" className="block mb-3 text-lg font-medium text-white">
//           Payment Method
//         </label>
//         <select
//           id="payment"
//           value={selectedPayment}
//           onChange={handlePaymentSelect}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
//         >
//           <option value="">-- Select Payment Method --</option>
//           <option value="cod" className="">Cash on Delivery (COD)</option>
//           <option value="debitcard" className="">Debit Card</option>
//           <option value="creditcard" className="">Credit Card</option>
//           <option value="paylater" className="">Pay Later</option>
//         </select>

//         {/* COD Details Dropdown */}
//         {selectedPayment === "cod" && (
//           <div className="cod-details mt-4">
//             <h2 className="text-lg font-semibold mb-2 text-white">COD</h2>

//             <p className="text-white">{codDetails}</p>

//           </div>
//         )}

//         {
//             selectedPayment==="debitcard" && (

//                 <div className="debitCardContainer">

// <label htmlFor="cod-phone" className="block mb-1 text-sm font-medium text-white">
//               Card Details
//             </label>
//             <input
//               type="text"
//               id="debit-cardnumber"
//               name="cardnumber"
//               value={debitDetails.cardnumber}
//               onChange={handleDebitDetails}
//               placeholder="Enter your 16-Digits Number"
//               className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 " 
//             />

// <input

//               type="text"
//               id="debit-username"
//               name="username"
//               value={debitDetails.username}
//               onChange={handleDebitDetails}
//               placeholder="Name on Card"
//               className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 "

// />

// <input
//               type="text"
//               id="debit-validation"
//               name="validation"
//               value={debitDetails.validation}
//               onChange={handleDebitDetails}
//               placeholder="Valid thru"
//               className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 "
//             />

// <input

//               type="password"
//               id="debit-cvv"
//               name="cvv"
//               value={debitDetails.cvv}
//               onChange={handleDebitDetails}
//               placeholder="CVV"
//               className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 "


// />

//                 </div>




//             )

//         }






//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-transparent text-white py-2 rounded hover:bg-green-600 mt-2"
//           onClick={handleCongrats}
//         >
//           Proceed to Pay
//         </button>
//       </form>
//     </div>
//     </>
//   );
// }

// export default PaymentGateway;



import React from "react";
import axios from "axios";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faCreditCard, faMobileAlt,faMoneyCheckAlt ,faClock} from '@fortawesome/free-solid-svg-icons';
// For brand icons
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Header from "../components/HeaderChange.js";
import Upi from "../assets/PaymentPageIcons/upi.png";
import Emi from "../assets/PaymentPageIcons/emi.png";
import Visa from "../assets/PaymentPageIcons/visa.png";
import Wallet from "../assets/PaymentPageIcons/wallet.png";
import { BASE_URL } from "../config/config.js";
import { useNavigate } from 'react-router-dom'; 

const PaymentGateway = () => {


  const [selectedOption,setSelectedOption]=useState(null);
  const [visa,setVisa]=useState(false);
  const [upi,setUpi]=useState(false);
  const [emi,setEmi]=useState(false);
  const [paylater,setPaylater]=useState(false);
  const navigate=useNavigate();


const handleCongrats=()=>{

  navigate("/users/completed");

}

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

 const  handleCheckPaymentSuccess=async(RAZR_PAY_ID_)=>
 {

  try{
  const response=await axios.post(`${BASE_URL}/users/verify-payment`, { RAZR_PAY_ID_ });

  if(response.data.success)
  {
    alert("PAYMENT SUCCESS 200"+response.data.payment);
    return true;
  }
  else{

    alert("PAYMENT NOT CONFIRMED.... STATUS"+response.data.status)
    return false;

  }




  }catch(err)
  {
    alert("ERROR VERYFYING PAYMENT PLEASE CONTACT SUPPORT STAFF!!!!")
  }

 }
   

  
   const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }
  
    try {
      // ✅ Correct axios POST
    const response = await axios.post(
    `${BASE_URL}/users/create-order`,
    { amount: 65000 }, // ✅ This is the actual request body
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );



  
  const orderData = response.data
  
  console.log("orderData",orderData);
      const options = {
        key: "rzp_test_wuFJ7sKk68vkn4", // Razorpay Test Key
        amount: orderData.amount,
        currency: "INR",
        name: "Khareed Lay",
        description: "Khareed Lay - Big Electronics E-Commerce Platform in India",
        order_id: orderData.id,

    method:{

    upi: upi,
    card: visa,
    netbanking: false,
    wallet: false,
    emi: emi,
    paylater: paylater,

    },

        handler: async function (response) {
          alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        const res= await handleCheckPaymentSuccess(response.razorpay_payment_id);

        if(res==true)
        {

handleCongrats();
        }
      

          
          // Optionally verify with backend here
        },
  
      



  
        
        prefill: {
          name: "Ahmed",
          email: "Ahmedkhandelhi123@gmail.com",
          contact: "8882066763",
        },
        theme: {
          color: "#28a745",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed or server unreachable.");
    }
  };


  const handlePaymentData = (e) => {
    
    setSelectedOption(e.target.name);

    if( e.target.name === "upi") {
      setUpi(true);
      setVisa(false);
      setEmi(false);
      setPaylater(false);
    }

    else if(e.target.name === "Credit") {
      setUpi(false);
      setVisa(true);
      setEmi(false);
      setPaylater(false);
    }   

    else if(e.target.name === "EMI") {
      setUpi(false);
      setVisa(false);
      setEmi(true);
      setPaylater(false);
    }

    else if(e.target.name === "Paylater") {
      setUpi(false);
      setVisa(false);
      setEmi(false);
      setPaylater(true);
    }


  }



  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 overflow-hidden bg-gray-100 py-40 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Payment</h2>

        {/* Order Summary */}
        <div className="border p-4 rounded-xl mb-6">
          <h3 className="font-semibold mb-2 text-gray-700">Order Summary</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Product</span>
            <span>iPhone 14 Pro Max</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Quantity</span>
            <span>1</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery</span>
            <span>Free (1 Hour Delivery)</span>
          </div>
          <div className="border-t my-2"></div>
          <div className="flex justify-between font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>₹70,000</span>
          </div>
        </div>

        {/* Payment Method (for UI only) */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-700">Choose Payment Method</h3>
          <div className="grid gap-3">
            <div className="border rounded-lg p-3 flex items-center gap-3 bg-gray-50 hover:bg-white cursor-pointer" >
              {/* <img src="/icons/upi.png" className="h-6" alt="UPI" /> */}
              <img src={Upi} className="h-12 w-12 object-contain" alt="UPI" />
              <span className="text-sm font-medium">UPI</span>
              <input type="radio" 
              
              name="upi"
              checked={selectedOption==="upi"}
              onClick={handlePaymentData}
              
              
              
              ></input>
            </div>
            <div className="border rounded-lg p-3 flex items-center gap-3 bg-gray-50 hover:bg-white cursor-pointer">
             <img src={Visa} className="h-12 w-12 object-contain" alt="Visa/Debit" />
              <span className="text-sm font-medium">Credit/Debit Card</span>
                  <input type="radio" 
              
              name="Credit"
              checked={selectedOption==="Credit"}
              onClick={handlePaymentData}
              
              
              
              ></input>
            </div>
            <div className="border rounded-lg p-3 flex items-center gap-3 bg-gray-50 hover:bg-white cursor-pointer">
             {/* <FontAwesomeIcon icon={faMoneyCheckAlt} className="h-6 " /> */}

              <img src={Emi} className="h-12 w-12 object-contain" alt="Emi" />

              <span className="text-sm font-medium">EMI</span>
                   <input type="radio" 
              
              name="EMI"
              checked={selectedOption==="EMI"}
              onClick={handlePaymentData}
          
              
              
              ></input>
            </div>
            <div className="border rounded-lg p-3 flex items-center gap-3 bg-gray-50 hover:bg-white cursor-pointer">
           <img src={Wallet} className="h-12 w-12 object-contain" alt="Paylater" />
              <span className="text-sm font-medium">Pay Later</span>
                   <input type="radio" 
              
              name="Paylater"
              checked={selectedOption==="Paylater"}
              onClick={handlePaymentData}
              
              ></input>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full  bg-green-600 hover:bg-gradient-to-r from-green-500 to-purple-600 text-white text-lg font-bold py-3 rounded-xl transition duration-200"
        >
          Proceed to Pay ₹70,000.00
        </button>




      </div>
    </div>
    </>
  );
};

export default PaymentGateway;
