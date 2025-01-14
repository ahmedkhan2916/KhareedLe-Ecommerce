import React from 'react'
import "../assets/Style/shopbycat.css"
import "../assets/Style/Headings.css"

function ShopByCategory() {
  return (
    <>
    
        <div className='shopByCategoryContainer mt-2'>

            <div className="shopByCategoryChildCategory">

<div className='headingShopByCategory  flex justify-center flex-col items-center border-b-2 border-gray-100'>

    <h1 className='text-5xl HeadingPlayFair'> Shop by Category   </h1>
    <p className='p-2'> Find what you need in just a few clicks! </p>

</div>


<div className='itemsCategoryContainer  h-1/4 w-full p-8 '>

<div className='categoryCardsContainer  h-full w-full flex '>

    <div className="cardsShop  flex flex-col items-center h-full w-full shadow-2xl rounded-xl justify-between ">

        <div className="cardsHeading  pb-2">

            <h2 className="text-xl  ">Smartphones</h2>

        </div>

        <div className="cardsImage ">

            <img  src="https://media-private.canva.com/fzokE/MAGcLBfzokE/1/p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20250114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250114T084638Z&X-Amz-Expires=34317&X-Amz-Signature=93622d4ed7be8c35a413de68bb6b7f7568c37acd109aa4458f1cd5b94e856e65&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2014%20Jan%202025%2018%3A18%3A35%20GMT"></img>

        </div>

        <div className="cardsButton bg-red-500 hover:bg-green-500 rounded p-2 ">

<button className="text-white">Explore Now</button>

        </div>


    </div>



    <div className="cardsShop  flex flex-col items-center h-full w-full shadow-2xl rounded-xl justify-between ">

<div className="cardsHeading  pb-2">

    <h2 className="text-xl  ">Accessories</h2>

</div>

<div className="cardsImage ">

    <img  src="https://media-private.canva.com/rjD48/MAGcLfrjD48/1/p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20250113%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250113T185238Z&X-Amz-Expires=82061&X-Amz-Signature=79f9aa2f3ea6c674bb2550465528ec9198815972f46ae521d87c76bf4de90dc4&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2014%20Jan%202025%2017%3A40%3A19%20GMT"></img>

</div>

<div className="cardsButton bg-red-500 hover:bg-green-500 rounded p-2">

<button className="text-white">Explore Now</button>

</div>


</div>




<div className="cardsShop  flex flex-col items-center h-full w-full shadow-2xl rounded-xl justify-between ">

<div className="cardsHeading  pb-2">

    <h2 className="text-xl  "> Gifts </h2>

</div>

<div className="cardsImage ">

    <img  src="https://media-private.canva.com/PEsS4/MAGcLSPEsS4/1/p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20250114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250114T061119Z&X-Amz-Expires=42510&X-Amz-Signature=d50518f56369ae28289767d11b4b7bae2289acf2e3638326e902d4d52fe3c8c5&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2014%20Jan%202025%2017%3A59%3A49%20GMT"></img>

</div>

<div className="cardsButton bg-red-500 hover:bg-green-500 rounded p-2">

<button className="text-white">Explore Now</button>

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