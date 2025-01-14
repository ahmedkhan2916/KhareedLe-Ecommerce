import React, { useState } from "react";
import Header from "../components/HeaderChange.js";
import "../assets/Style/payment.css"
import "../assets/Style/Headings.css"

function PaymentGateway() {
  const [selectedPayment, setSelectedPayment] = useState(""); // To track selected payment method
  const [codDetails, setCodDetails] = useState("COD Fee will be Charged by ₹80"); // COD-specific details
  const [debitDetails,setDebitDetails]=useState({cardnumber:"",username:"",validation:"",cvv:""})
  const [counter,setCounter]=useState(0);

  const handlePaymentSelect = (e) => {
    setSelectedPayment(e.target.value);
  };

//   const handleCodDetailsChange = (e) => {
//     setCodDetails({ ...codDetails, [e.target.name]: e.target.value });
//   };

const handleDebitDetails=(e)=>{

  const {name,value}=e.target;

    // if()
    // {
    //     console.log("reached",counter);
    //     setDebitDetails({...debitDetails,[e.target.name]:e.target.value+"/"})
    //     setCounter(0);
    // }
  if(name==='validation')
 {
        const sanitization=value.replace(/[^0-9]/g, "");
        
        if(sanitization.length>4)
        {
            return;
        }

        if(sanitization.length>2)
        {

            setDebitDetails({...debitDetails,[name]:sanitization.slice(0,2)+"/"+sanitization.slice(2)})

        }
        else{
            setDebitDetails({...debitDetails,[e.target.name]:sanitization});
         }


 }


  else if(name==="cvv")
 {

  
    if(value.length < 4)
    {
    setDebitDetails({...debitDetails,[e.target.name]:e.target.value});
    }

    else{
        return
    }
 }


 else if(name==="cardnumber")
    {
   
     
       if(value.length < 17)
       {
       setDebitDetails({...debitDetails,[e.target.name]:e.target.value});
       }
   
       else{
           return
       }
    }


 else{
    setDebitDetails({...debitDetails,[e.target.name]:e.target.value});
 }

 


}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Payment Method:", selectedPayment);
    if (selectedPayment === "cod") {
      console.log("COD Details:", codDetails);
    }
  };

  return (
    <>
   
   <Header></Header>
 
    <div className="payment-container flex flex-row items-center justify-between h-screen  bg-gray-200 pt-28">

        <div className="ImageSideDesign h-full -ml-36 w-1/3 rounded-r-full">


        </div>
        <div className="textContainerPayment">
      <h1 className="PaymentHeading text-3xl font-bold mb-6 HeadingPlayFai text-white">Select Your Payment Method</h1>
      </div>
      <form onSubmit={handleSubmit} className="formContainerPayment w-96 p-6 mr-8 bg-transparent shadow-green-300 shadow-lg rounded-lg">
        {/* Dropdown to Select Payment Method */}
        <label htmlFor="payment" className="block mb-3 text-lg font-medium text-white">
          Payment Method
        </label>
        <select
          id="payment"
          value={selectedPayment}
          onChange={handlePaymentSelect}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">-- Select Payment Method --</option>
          <option value="cod" className="">Cash on Delivery (COD)</option>
          <option value="debitcard" className="">Debit Card</option>
          <option value="creditcard" className="">Credit Card</option>
          <option value="paylater" className="">Pay Later</option>
        </select>

        {/* COD Details Dropdown */}
        {selectedPayment === "cod" && (
          <div className="cod-details mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">COD</h2>

            <p className="text-white">{codDetails}</p>
{/* 
            <label htmlFor="cod-phone" className="block mb-1 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="cod-phone"
              name="phone"
              value={codDetails.phone}
              onChange={handleCodDetailsChange}
              placeholder="Enter your phone number"
              className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />

            <label htmlFor="cod-address" className="block mb-1 text-sm font-medium">
              Delivery Address
            </label>
            <textarea
              id="cod-address"
              name="address"
              value={codDetails.address}
              onChange={handleCodDetailsChange}
              placeholder="Enter your address"
              className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            ></textarea> */}
          </div>
        )}

        {
            selectedPayment==="debitcard" && (

                <div className="debitCardContainer">

<label htmlFor="cod-phone" className="block mb-1 text-sm font-medium text-white">
              Card Details
            </label>
            <input
              type="text"
              id="debit-cardnumber"
              name="cardnumber"
              value={debitDetails.cardnumber}
              onChange={handleDebitDetails}
              placeholder="Enter your 16-Digits Number"
              className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 " 
            />

<input

              type="text"
              id="debit-username"
              name="username"
              value={debitDetails.username}
              onChange={handleDebitDetails}
              placeholder="Name on Card"
              className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 "

/>

<input
              type="text"
              id="debit-validation"
              name="validation"
              value={debitDetails.validation}
              onChange={handleDebitDetails}
              placeholder="Valid thru"
              className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 "
            />

<input

              type="password"
              id="debit-cvv"
              name="cvv"
              value={debitDetails.cvv}
              onChange={handleDebitDetails}
              placeholder="CVV"
              className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300 "


/>



                </div>




            )


        }

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-transparent text-white py-2 rounded hover:bg-green-600 mt-2"
        >
          Proceed to Pay
        </button>
      </form>
    </div>
    </>
  );
}

export default PaymentGateway;
