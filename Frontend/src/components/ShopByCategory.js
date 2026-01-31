import React from 'react'
import "../assets/Style/shopbycat.css"
import "../assets/Style/Headings.css"
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getDataAccCategory} from '../store/dataSlice.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ShopByCategory() {

    const dispatch=useDispatch();

    const savedText = useSelector((state) => state.category);
    const navigate = useNavigate();
    


   const handleCategory=(Category)=>{


    alert("yesss")


    if(Category==="Smartphone")
    {
        alert("yes i am inside")
        dispatch(getDataAccCategory({ category: "Smartphone" }));
        navigate("/users/ProductByCategory")

        
    }

      else if(Category==="Gaming")
    {
        alert("yes i am inside")
        dispatch(getDataAccCategory({ category: "Gaming" }));
        navigate("/users/ProductByCategory")

        
    }




   }


   console.log("here is the savedDataaaaa",savedText)


  return (
    <>
    
        <div className='shopByCategoryContainer mt-7'>

            <div className="shopByCategoryChildCategory">

<div className='headingShopByCategory  flex justify-center flex-col items-center border-b-2 border-gray-100'>

    <h1 className='text-5xl HeadingPlayFair'> Shop by Category   </h1>
    <p className='p-2'> Find what you need in just a few clicks! </p>

</div>


<div className='itemsCategoryContainer  h-1/4 w-full p-8 '>

<div className='categoryCardsContainer  h-full w-full flex flex-col sm:flex-row '>

    <div className="cardsShop  flex flex-col items-center h-full w-full shadow-2xl rounded-xl justify-between ">

        <div className="cardsHeading  pb-2" >

            <h2 className="text-xl" >Smartphones</h2>

        </div>

        <div className="cardsImage ">

            <img  src="https://images.unsplash.com/photo-1738344858158-66f743afcf3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGlwaG9uZSUyMDE2fGVufDB8fDB8fHww"></img>

        </div>

        <div className="cardsButton bg-red-500 hover:bg-green-500 rounded p-2 ">

<button className="text-white" onClick={() => handleCategory("Smartphone")}>Explore Now</button>

        </div>


    </div>



    <div className="cardsShop  flex flex-col items-center h-full w-full shadow-2xl rounded-xl justify-between ">

<div className="cardsHeading  pb-2">

    <h2 className="text-xl  ">Accessories</h2>

</div>

<div className="cardsImage ">

    <img  src="https://images.unsplash.com/photo-1643536768014-0756fa85ca4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3Ryb25pY3MlMjBnYWRnZXRzfGVufDB8fDB8fHww"></img>

</div>

<div className="cardsButton bg-red-500 hover:bg-green-500 rounded p-2">

<button className="text-white">Explore Now</button>

</div>


</div>




<div className="cardsShop  flex flex-col items-center h-full w-full shadow-2xl rounded-xl justify-between ">

<div className="cardsHeading  pb-2">

    <h2 className="text-xl  "> Gaming </h2>

</div>

<div className="cardsImage ">

    <img  src="https://variety.com/wp-content/uploads/2024/09/Sony-PlayStation-Pro-5.png?w=1000&h=667&crop=1"></img>

</div>

<div className="cardsButton bg-red-500 hover:bg-green-500 rounded p-2">

<button className="text-white" onClick={() => handleCategory("Gaming")}>Explore Now</button>

</div>


</div>

</div>



</div>


<div className=''>


</div>



            </div>
    </div>

    </>

  )
}

export default ShopByCategory