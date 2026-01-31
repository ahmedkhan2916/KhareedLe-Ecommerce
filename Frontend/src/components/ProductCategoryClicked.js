import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderChange from "../components/HeaderChange.js"

function ProductCategoryClicked() {
  const savedText = useSelector((state) => state.category.CategoryData);
  const loading = useSelector((state) => state.category.CategoryLoading);
  const [savedTextState, setSavedTextState] = useState([]);

  useEffect(() => {
    if (Array.isArray(savedText)) {
      setSavedTextState(savedText);
    } else if (savedText) {
      setSavedTextState([savedText]); // wrap single object into array
    } else {
      setSavedTextState([]);
    }
  }, [savedText]);

  console.log("here is the state",savedTextState);

  return (
    <>

     <HeaderChange></HeaderChange>
      {loading ? (
        <h1 className="text-xl font-semibold text-gray-700">Loading.......</h1>
      ) : (

       
        <div className="flex flex-col gap-6 pt-36">
          {Array.isArray(savedTextState) &&
            savedTextState.map((item, index) => (
              <div
                className="flex flex-col md:flex-row items-start gap-6 border border-gray-200 rounded-2xl p-4 shadow-sm bg-white"
                key={index}
              >
                {/* Left side image */}
                <div className="w-full md:w-48 flex-shrink-0">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>

                {/* Right side details */}
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {item.product_name}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 mb-3">
                    {item.product_details}  
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    ₹ {item.price}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
//add header and footer
export default ProductCategoryClicked;
