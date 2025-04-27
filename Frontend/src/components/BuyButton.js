import { useState } from "react";
import { fetchID } from "../Services/apiService";
import axios from "axios";

const BuyButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBuyNow = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        setShowLoginModal(true); // Show the modal
        return
      } else {
        // Proceed to buying logic
        proceedToBuy();
      }

    const IDS=await fetchID(localStorage.getItem("accessToken"));

    const Ids={userId:IDS,productId:localStorage.getItem("productID")};
    window.location.href = "/users/shipping";


    try{

    const sendIDS=await axios.post("http://localhost:1000/users/addbag",Ids); 
    
    
    }
    catch(error)
    {
      return console.error("this is error in buy button",error)
        
     }

  
  };

  const proceedToBuy = () => {
    // Your normal buying logic
    console.log("Proceeding to buy...");
  };

  
    const handleLoginRedirect = () => {
        const currentPath = window.location.pathname; // Get current page URL
        window.location.href = `/users/login?redirect=${encodeURIComponent(currentPath)}`; 
      };
      // Redirect to login


  return (
    <>
      <button onClick={handleBuyNow} className="bg-blue-500 text-white p-2 w-2/4 h-10 rounded-lg">
        Buy Now
      </button>

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

export default BuyButton;
