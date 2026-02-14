import React from 'react'
import "../assets/Style/cards.css"
// import "../../public/LoginLogos"
import "../assets/mediaquerys/cardsQuery.css"
import apple from "../assets/Brandlogo/apple.png"
import samsung from "../assets/Brandlogo/samsung.png"
import oneplus from "../assets/Brandlogo/oneplus.png"
import "../assets/Style/Headings.css"
function Specification() {

    const Brandlogo=[{brandName:"Apple", imageUrl:apple},{brandName:"Samsung", imageUrl:samsung},{brandName:"Oneplus", imageUrl:oneplus}];



  return (

    <div className='mainCont pl-8 pt-16 relative z-0'>

        <div className='heading pb-9 flex justify-center'>
            <h2 className='text-4xl HeadingPlayFair'>Popular Brands</h2>

        </div>

        <div className='cardsContainer flex justify-around'>

        {

            Brandlogo.map((items)=>(
                <div className='cards rounded-2xl' style={{backgroundImage:`url(${items.imageUrl})`}}>
                <h2 className='helloworld text-2xl flex items-center justify-center  text-white '>{items.brandName}</h2>
                
    
    
            </div>

            ))   

}
        </div>
    </div>

  )
}

export default Specification
