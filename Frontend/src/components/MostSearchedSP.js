import React from 'react';
import ProductSlider from "./ProductSlider.js";
import "../assets/Style/productSlider.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/dataSlice.js';
import { useEffect,useState } from 'react';
import "../assets/Style/Headings.css";
import SearchLogo from "../assets/LoginLogos/fire.png"
import axios from "axios";

function MostSearchedSP() {
    const [data,setData]=useState([])
    const dispatch = useDispatch();
   
    
const handleClick = async (event) => {

        const id = event.currentTarget.getAttribute('data-id');
        console.log("id is hereee in mostSearchedSP",id);
        dispatch(fetchData(id));
        
        
    };
    
    useEffect( ()=>{

    const fetchData = async () => {

        try{

        const jsonData = await axios.post("http://localhost:1000/users/fetch-search-history").then((res) => setData(res.data));
       
        }catch(err)
        {
            console.log("Something has error in your Server...>>>!")
        }
        
      };
    
      fetchData();
     
    },[])

    // console.log("it is coming data from product Insights",data);

  return (
    <div className="productDetailsContainerParent  mt-6">
        <div className="HeadingSmartphone  text-center">

<h1 className='HeadingPlayFair text-4xl'>Most Searched Smartphones</h1>

</div>

<div className="mostSearchingContainer relative left-16 top-11 inline-flex flex-row">
  <h2>Most Searching &nbsp;</h2>
  <img src={SearchLogo} className="h-5"></img>
</div>

    <div className='productDetailsCont mt-12 flex'>




{/* <div className='headingCont pl-16 '>
    <h2 className='text-3xl'>Powerful Smartphones</h2>
</div> */}


{
    data.map((item)=>(
<div className='productContainer  ml-16 border-t-2 border-l-2 border-r-2 border-b-2' key={item.productId} data-id={item.productId} onClick={handleClick}>
<Link to={`/product/${item.productId}`}>
    <div className='image w-[50vw]  sm:w-[9vw]'>
{/* <img className='imageProduct w-full' style={{backgroundImage:`url('/images/ferrari.jpg')`}}></img> */}

<div className='phDiv h-[15vh]' style={{backgroundImage:`url(${item.product_image})`}}>

    </div>
    </div>
    <div className='productName w-full flex flex-col items-center'>

        <h3 className='text-base'>  {item.product_name} </h3>
        {/* <span className='text-base'>₹{item.price}</span> */}

    </div>
    </Link>
</div>

    )) }

    </div>
    </div>
  )
}

export default MostSearchedSP