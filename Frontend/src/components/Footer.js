import React from 'react'
import khareedLe from "../assets/images/HeaderLogos/khareedLe.png";
import "../assets/Style/footer.css"
import Facebook from "../assets/Socialicons/facebook.png"
import Instagram from "../assets/Socialicons/instagram.png"
import Twitter from "../assets/Socialicons/twitter.png";
import whatsapp from "../assets/Socialicons/whatsapp.png"
import upi from "../assets/Socialicons/upi.png"
import visa from "../assets/Socialicons/visa.png"
import master from "../assets/Socialicons/card.png"
import ssl from "../assets/Socialicons/ssl2.png"
function Footer() {
  return (
    <div className='footerContainer mt-6'>

      <div className=' footerContainerChild  pt-12 bg-red-500 sm:bg-black '>


          <div className='upperContainer  flex justify-evenly'>

            <div className='upperData  border-1 border-r-2 border-white w-40 text-center'>

            <div className='textContainer  p-2 '>
              <p className='text-white'>About Us</p>

            </div>

            <div className='textContainer p-2'>
              <p className='text-white'>Careers</p>

            </div>

            <div className='textContainer p-2'>
              <p className='text-white'>Contact Us</p>

            </div>



            </div>


            <div className='upperData  border-1 border-r-2 border-white w-40 text-center'>

<div className='textContainer  p-2'>
  <p className='text-white'>Help Center</p>

</div>      

<div className='textContainer p-2'>
  <p className='text-white'>FAQ's</p>

</div>

<div className='textContainer p-2'>

  <p className='text-white'>Order Tracking</p>

</div>



</div>


<div className='upperData  border-1 border-r-2 border-white w-40 text-center'>

<div className='textContainer  p-2'>

  <p className='text-white'>Account</p>

</div>

<div className='textContainer p-2'>

  <p className='text-white'>Wishlist</p>

</div>

<div className='textContainer p-2'>

  <p className='text-white'>My Account</p>

</div>



</div>


<div className='upperData  border-1 border-r-2 border-black w-40 text-center'>

<div className='textContainer  p-2'>
  <p className='text-white'>Legal</p>

</div>

<div className='textContainer p-2'>
  <p className='text-white'>Privacy Policy</p>

</div>

<div className='textContainer p-2'>

  <p className='text-white'>Terms & Conditions</p>

</div>

<div className='textContainer p-2'>

  <p className='text-white'>Cookie Policies</p>

</div>


</div>

          </div>


{/* Product Description */}

          <div className='productDescriptionContainer flex justify-center p-4'>

            <div className='LeftSection p-2'>

              <p className='text-white'>Product Description :</p>

            </div>

            <div className='rightSection flex'>

<div className='textSectionProduct border-1 border-r-2 border-white p-2'>

  <p className='text-white'>Smartphones</p>

</div>


<div className='textSectionProduct p-2 border-1 border-r-2 border-white'>

  <p className='text-white'>Laptops</p>

</div>


<div className='textSectionProduct p-2 border-1 border-r-2 border-white'>

  <p className='text-white'>Tablets</p>

</div>

            </div>

          </div>


          {/* payment method section */}


          <div className='paymentMethodDescriptionContainer flex justify-center p-4 items-center'>

<div className='LeftSection p-2'>

  <p className='text-white'>PaymentMethods :</p>

</div>

<div className='rightSection flex'>

<div className='textSectionProduct  p-2'>

<img src={upi} className='h-16'></img>



</div>


<div className='textSectionProduct p-2 '>

<img src={visa} className='h-16'></img>

</div>


<div className='textSectionProduct p-2 '>

<img src={master} className='h-14'></img>

</div>




</div>




</div>


{/* childpaymentcontainer */}

<div className='logoName ml-7'>

<h1 className='text-green-600 text-5xl brandName'>KHAREEDLE<span className='text-base relative bottom-8'>®</span></h1>
{/* <span className='text-yellow-300 '>Genuine Only</span> */}

</div>



<div className='paymentMethodDescriptionContainer flex justify-center p-4 items-center'>
  

<div className='LeftSection p-2'>

  <p className='text-white'>Secure Checkout</p>

</div>

<div className='rightSection flex '>

<div className='textSectionProduct  p-2'>

<img src={ssl} className='h-9'></img>

</div>
</div>
</div>



{/* social media links */}


<div className='paymentMethodDescriptionContainer flex justify-center p-4 items-center'>

<div className='LeftSection p-2'>

  <p className='text-white'>Connect with Us :</p>

</div>

<div className='rightSection flex'>

<div className='textSectionProduct  p-2'>

{/* <p className='text-white'>[Facebook]</p> */}
<img src={Facebook} className='h-6'></img>

</div>


<div className='textSectionProduct p-2 '>

<img src={Instagram} className='h-6'></img>

</div>


<div className='textSectionProduct p-2 '>

<img src={Twitter} className='h-6'></img>

</div>

<div className='textSectionProduct p-2 '>

<img src={whatsapp} className='h-6'></img>

</div>


</div>




</div>


{/* copyright container */}

<div className='copyRightContainer flex justify-center pb-6'>

  <div className='textContainerCopyright'>

    <p className='text-white'> © 2024 KhareedLe Hub. All Rights Reserved. </p>

  </div>


</div>



      </div>

    </div>
  )
}

export default Footer