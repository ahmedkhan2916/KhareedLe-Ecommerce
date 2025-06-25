import React from 'react'
import "../assets/Style/productSlider.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData ,fetchProducts} from '../store/dataSlice.js';
import { useEffect,useState } from 'react';



function ProductSlider() {

    
    const dispatch = useDispatch();
    const { data: products, loading, error } = useSelector(state => state.slideproducts);
     
   
    
const handleClick = async (event) => {

        const id = event.currentTarget.getAttribute('data-id');
        dispatch(fetchData(id));


        
          
};
    
    useEffect( ()=>{

    const fetchData = async () => {

      
       
        dispatch(fetchProducts())

        
        
      };

    
    
      fetchData();
     
    },[])

   
    if (loading) return <div className='pl-16 text-xl'>Loading...</div>;
    if (error) return <div className='pl-16 text-xl text-red-500'>Error: {error}</div>;

  return (


    <div className='productDetailsCont mt-12 flex'>
{
    products.map((item)=>(
<div className='productContainer  ml-16 border-t-2 border-l-2 border-r-2 border-b-2' key={item._id} data-id={item._id} onClick={handleClick}>
<Link to={`/product/${item._id}`}>

<div className='image w-[50vw]  sm:w-[9vw]'>

<div className='phDiv  h-[15vh]' style={{backgroundImage:`url(${item.product_image})`}}>
    
    </div>
    </div>
    <div className='productName w-full flex flex-col items-center'>

        <h3 className='text-base'>  {item.product_name} </h3>
        <span className='text-base'>₹{item.price}</span>

    </div>
    </Link>
</div>

    )) }

    </div>
  )
}

export default ProductSlider