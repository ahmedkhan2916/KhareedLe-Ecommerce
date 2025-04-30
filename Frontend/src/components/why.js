import React from 'react'
import fastestDelivery from "../assets/AI Images/fastdelivery5.jpg"
import lower from "../assets/AI Images/lower5.jpg"
import surprise from '../assets/AI Images/surprisegifts4.jpg'
import Quality from "../assets/AI Images/quality4.jpg";
import Inhand from "../assets/AI Images/inhand3.jpg";
import "../assets/Style/Headings.css"

import "../assets/Style/why.css"
function Why() {
  return (
    <div className='whyContainerMain'>

        <div className="whyContainerChild">

{/* heading of whyContainer */}
<div className="whyUpperHeading  flex  justify-items-center  sm:justify-center ">

    <h1 className="text-3xl HeadingPlayFair sm:text-5xl">Why We are Different from Others?</h1>


</div>

{/* container of points */}
<div className="pointsContainer pt-20">

    <div className="pointsCard flex justify-around flex-col sm:flex-row">

        <div className="imageSectionPoints w-screen  rounded-lg sm:w-1/3">

            <img src={fastestDelivery} className='h-80  w-full object-cover rounded-lg'></img>

        </div>

        <div className="textContainerPoints w-screen  flex justify-center flex-col p-5  sm:w-2/5">

            <div className="upperHeadingText">
                <h2 className="text-4xl HeadingPlayFair font-bold">Ultra-Fast 24 hour Delivery.</h2>
            </div>

            <div className="paragraphText pt-1">

                <p className="text-base font-light">Delivering electronic products within 24 Hours, ensuring customers receive their orders swiftly.</p>

            </div>

        </div>

    </div>


{/* second card */}

<div className="pointsCard flex justify-around pt-20 flex-col-reverse sm:flex-row">



<div className="textContainerPoints w-screen  flex justify-center flex-col p-5  sm:w-2/5">

    <div className="upperHeadingText">
        <h2 className="text-4xl font-medium HeadingPlayFair">Competitive Price.</h2>
    </div>

    <div className="paragraphText pt-1">

        <p className="text-base font-light">Offering prices lower than market rates.</p>

    </div>

</div>


<div className="imageSectionPoints  w-screen  rounded-lg sm:w-1/3">

    <img src={lower} className='h-80 rounded-lg w-full object-cover'></img>

</div>



</div>


{/* 3rd pointcard */}

<div className="pointsCard flex justify-around pt-20 flex-col sm:flex-row">

<div className="imageSectionPoints w-screen  rounded-lg sm:w-1/3">

    <img src={surprise} className='h-80 rounded-lg w-full object-cover'></img>

</div>

<div className="textContainerPoints w-screen  flex justify-center flex-col p-5  sm:w-2/5">

    <div className="upperHeadingText">
        <h2 className="text-4xl font-medium HeadingPlayFair">Exclusive Surprise Gifts.</h2>
    </div>

    <div className="paragraphText pt-1">

        <p className="text-base font-light">Every purchase includes free items like mobile cases, tempered glass, and surprise gifts (e.g., headphones, power banks and neckband).</p>

    </div>

</div>

</div>

{/* 4 point card */}

<div className="pointsCard flex justify-around pt-20 flex-col-reverse sm:flex-row">



<div className="textContainerPoints w-screen  flex justify-center flex-col  p-5  sm:w-2/5">

    <div className="upperHeadingText">
        <h2 className="text-4xl font-medium HeadingPlayFair">Quality Assurance.</h2>
    </div>

    <div className="paragraphText pt-1">

        <p className="text-base font-light">We ensure Product is Genuine and Original.</p>

    </div>

</div>


<div className="imageSectionPoints w-screen  rounded-lg sm:w-1/3">

    <img src={Quality} className='h-80 rounded-lg w-full object-cover'></img>

</div>



</div>


{/* 5 point card */}


<div className="pointsCard flex justify-around pt-20 pb-14 flex-col sm:flex-row">

<div className="imageSectionPoints w-screen  rounded-lg sm:w-1/3">

    <img src={Inhand} className='h-80 rounded-lg w-full object-cover'></img>

</div>

<div className="textContainerPoints w-screen  flex justify-center flex-col p-5 sm:w-2/5">

    <div className="upperHeadingText">
        <h2 className="text-4xl font-medium HeadingPlayFair">Experience Before You Own.</h2>
    </div>

    <div className="paragraphText pt-1">

        <p className="text-base font-light">Get the ultimate hands-on experience of your desired smartphone at your doorstep. Feel the design, weight, and comfort of the device in your hand before making a purchase, ensuring complete satisfaction and confidence in your choice.</p>

    </div>

</div>

</div>





</div>





        </div>

    </div>
  )
}

export default Why;