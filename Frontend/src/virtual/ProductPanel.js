import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchData,
  fetchReviewData,
  fetchUserID,
  fetchBagTotal2,
  fetchAddToBag,
  changeButtonText,
  resetButtonText,
  increment,
  setSimiliarProduct,
  setProductData
} from "../store/dataSlice.js";

export default function ProductPanel({ shelf, onClose }) {

  // ✅ Hooks ALWAYS at top
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchData("6862c232cd5edf03c44e75e6"));
  }, [dispatch]);

  const data = useSelector((state) => state.data.data);
  console.log("Redux data in ProductPanel:", data);

  useEffect(() => {
    if (shelf) {
      console.log("Selected shelf:", shelf);
      console.log("Redux data:", data);
    }
  }, [shelf, data]);

  // ✅ Conditional rendering AFTER hooks
  if (!shelf) return null;

  const white = data?.product_color?.find(item => item.color === "White");
  console.log("White color product data:", white);
  return (
    <div
      className="
        absolute right-5 top-1/2 -translate-y-1/2
        w-[300px]
        bg-white/10
        backdrop-blur-md
        p-4
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
          <div className="rounded-lg bg-white/10 p-3">
            📱 {data.product_name}
                <div className="mt-2">

                  
  <img 
    src={white.image_urls[0]} 
    className="w-full h-32 object-cover rounded-lg" 
  />

   
    </div>
          

          </div>
        )}
      </div>
    </div>
  );
}
