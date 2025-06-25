import React from "react";
import axios from "axios";



const RazorpayButton = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Failed to load Razorpay SDK");
    return;
  }

  try {
    // ✅ Correct axios POST
  const response = await axios.post(
  "http://localhost:1000/users/create-order",
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
      key: "rzp_test_bEM9BDCRfFjxoi", // Razorpay Test Key
      amount: orderData.amount,
      currency: "INR",
      name: "Khareed Lay",
      description: "Khareed Lay - Big Electronics E-Commerce Platform in India",
      order_id: orderData.id,
      handler: function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
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


  return (
    <div>
      <h2>Buy Iphone 16 pro at - ₹70,000</h2>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayButton;
