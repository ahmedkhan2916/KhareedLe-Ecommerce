import React, { useEffect } from 'react'
import FilterSearch from '../components/FilterSearch'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import Header from '../components/HeaderChange.js';

function FilteredByUserSearch() {

  const [filteredData,setfilteredData]=useState([]);
  const redxFilteredData=useSelector((state)=>state.filteredData.filteredData.data)

  console.log("redxFilteredData",redxFilteredData);
 
  
 useEffect(()=>{


 setfilteredData(redxFilteredData);



  },[redxFilteredData])


  console.log("filteredDataState",filteredData);

  return (
    <>

    <Header></Header>
    <div className='mainContainerFilterSearch flex flex-row-reverse '>
      
        <FilterSearch></FilterSearch>
    <div className='FilteredSearchContainer flex justify-center flex-col w-11/12'>
{
  filteredData?.map((item,index)=>(
    
      <div className='filteredItemsContainer flex  w-full rounded-lg bg-slate-50' key={index}>
        <div className='FilteredItemImageContainer w-2/4 flex justify-center'>

            <img className='FilteredItemImage w-2/4' src={item.product_image}></img>

        </div>
        
        <div className='filteredItemDetailTextContainer w-2/4'>
            <div className='FilterItemTitleContainer '>
<h3>{item.product_name}</h3>
            </div>
            <div className='FilterItemDescriptionContainer'>
<p>This Item is Soo Powerfull Bro you cant handle it.......</p>

            </div>

            <div className='FilterItemPriceContainer'>

                <p>$999</p>

            </div>

        </div>

      </div>

))}






       






      


    </div>
    </div>

    </>

  )
}

export default FilteredByUserSearch