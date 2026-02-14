import React, { useEffect ,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchData,
  fetchReviewData,
  fetchUserID,
  refreshToken,
  fetchBagTotal2,
  fetchAddToBag,
  changeButtonText,
  resetButtonText,
  increment,
  setSimiliarProduct,
  setProductData
} from "../../store/dataSlice.js";

export default function ProductPanel({ shelf, onClose }) {

  const [id, setID] = useState(null);
  const [signal,setSignal]=useState(false);


  const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
  const { token } = useSelector((state) => state.userAuth);

  const Navigate= useNavigate();

 console.log("here is the userid",UserID,token)
  // ✅ Hooks ALWAYS at top
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    if (!token) dispatch(refreshToken());
  }, [dispatch, token]);

  useEffect(() => {
    if (token) dispatch(fetchUserID(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchData("69837e00131d969894673482"));
  }, [dispatch]);

  const data = useSelector((state) => state.data.data);
  console.log("Redux data in ProductPanel:", data);

  useEffect(() => {
    if (shelf) {
      console.log("Selected shelf:", shelf);
      console.log("Redux data:", data);
    }
  }, [shelf, data]);

  const handleHome = ()=>{


    Navigate("/")

  }
    const handleAddtoCart = () => {
      // if (!token) return navigate('/users/login');
      // dispatch(resetButtonText());
      // setButtonClick2(false);   
      // setID();
      dispatch(fetchAddToBag({ userId: UserID, productId: data._id, Signal: false }));//use this logic same there in VR LOGIC 
      // dispatch(changeButtonText({ userId: UserID, productId: id }));
      // setButtonClick2(true);
      // dispatch(fetchBagTotal2({ ID: UserID }));
      // dispatch(increment(totalBag));

      alert("Product added to cart!");

    };





  // ✅ Conditional rendering AFTER hooks
  if (!shelf) return null;

  const white = data?.product_color?.find(item => item.color === "Orange");
  console.log("White color product data:", white);
  return (
    <div
      className="
        absolute right-5 top-1/2 -translate-y-1/2
        w-[600px]
        bg-white/10
        backdrop-blur-md
        p-5
        h-[300px]
        rounded-xl
        shadow-2xl
        border border-white/20
        z-10
        text-black
        
      "
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-2 top-2 text-white hover:text-red-400"
      >
        ✖
      </button>

      {/* Shelf title */}
      <h2 className="text-lg font-semibold mb-4">
        {shelf==="Shelf_Mobile" ? "AHMED_VISION" : "beech vali shelf pe click kar" }
      </h2>

      {/* Products */}
      <div className="flex flex-col gap-3">
        {/* If later you use array */}
        {/* 
        {Array.isArray(data) &&
          data.map((item) => (
            <div
              key={item._id}
              className="rounded-lg bg-white/10 p-3 hover:bg-white/20 transition"
            >
              📱 {item.company_name}
            </div>
          ))
        }
        */}

        {/* Current single product */}
        {data?.product_name && (
          <div className="rounded-lg bg-white/10 p-3 flex">
            
                <div className="mt-2">

                  
  <img 
    src={white.image_urls[0]} 
    className="w-full h-32 object-cover rounded-lg" 
  />



   
    </div>


<div className="rightPanelSideContainer p-4">

    <div className="productNameClass">

  <h1 className="text-xl font-medium text-black">{data.product_name}</h1>

    </div>
<div className="productDescription"> 
     <p className="text-gray-700">{data.description}</p>

</div>
    <div className="productStock"> 
       <p className="text-gray-700">
        InStock{" "}
        <span className={data.inStock ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
          { data.inStock ? "YES" : "NO" }
        </span>
       </p> 
    </div>

        <div className="productButtonsContainer"> 
          
    
    </div>
        <div className="productButtonsContainer flex gap-2 mt-3">
          <button
            className="flex-1 rounded-md bg-emerald-600 text-white text-sm font-semibold py-2 hover:bg-emerald-500 transition"
            type="button"
            onClick={handleAddtoCart}            >
            Add to Cart
          </button>
          <button
            className="flex-1 rounded-md bg-amber-500 text-black text-sm font-semibold py-2 hover:bg-amber-400 transition"
            type="button"
          >
            Buy Now
          </button>

          <button onClick={handleHome}>Back to Home</button>
        </div>
           
        
          

          </div>
          </div>
        )}
      </div>
    </div>
  );
}
