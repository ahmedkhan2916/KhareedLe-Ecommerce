import React from 'react'
import FilterSearch from '../components/FilterSearch'

function FilteredByUserSearch() {
  return (
    <div className='mainContainerFilterSearch flex flex-row-reverse '>
        <FilterSearch></FilterSearch>
    <div className='FilteredSearchContainer flex justify-center flex-col w-11/12'>

      <div className='filteredItemsContainer flex bg-gray-300 w-full rounded-lg'>
        <div className='FilteredItemImageContainer '>
            <img className='FilteredItemImage ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5I4qv9CTdQ4ullRO1LIkU1lYSVBEVLBW3BA&s"></img>

        </div>
        
        <div className='filteredItemDetailTextContainer'>
            <div className='FilterItemTitleContainer '>
<h3>Iphone 16pro 128Gb</h3>
            </div>
            <div className='FilterItemDescriptionContainer'>
<p>This Item is Soo Powerfull Bro you cant handle it.......</p>

            </div>

            <div className='FilterItemPriceContainer'>

                <p>$999</p>

            </div>

        </div>

      </div>






       






      


    </div>
    </div>

  )
}

export default FilteredByUserSearch