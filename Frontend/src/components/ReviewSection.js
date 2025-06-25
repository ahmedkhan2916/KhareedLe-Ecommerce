//Copy and Paste whole code from purchasing page....>>>>>>>>
import {useState,useEffect} from "react";
import{useDispatch,useSelector} from "react-redux";
import React from 'react'
import { fetchReviewData } from '../store/dataSlice.js';
import star from "../assets/Brandlogo/rating.png"

function ReviewSection() {

 const dispatch=useDispatch();
 const { reviewData, loadingReview, errorReview } = useSelector((state) => state.review);


    useEffect(()=>{


 dispatch(fetchReviewData()) 


    },[]);







  return (
    <div>


<div className="reviewContainer  ">

<div className='reviewHeading flex justify-center pt-10'>
    <h1 className='text-2xl'>Reviews & Comments</h1>

  </div>

 

  {
  
  loadingReview ? (
    <div className="text-gray-500 text-sm pl-20 pt-5">Loading reviews...</div>
  ) :(

  reviewData?.data?.map((reviewDataMap)=>(
    <div className='reviewChildContainer  pl-20 pt-5'>

    <div className="uperReviewContainer">
      <div className='userNameContainer  flex'>
    <div className="username  text-base">
      <h1>{reviewDataMap.userId.firstname}</h1>
    
    </div>
    <div className="ratings  pl-2 text-base flex ">
    <h1>{reviewDataMap.rating}</h1>
    <img src={star} className='h-5'></img>
    </div>
      </div>
    
      <div className='commentContainer  w-2/4 text-base pt-1'>
    
        <h1>{reviewDataMap.comment}</h1>
    
      </div>
      

      <div className="imageReview flex">

      {reviewDataMap.imgUrl.map((img, imgIndex) => (
            <img key={imgIndex} src={img} alt="Review" className="review-image h-14"/>
          ))}

        </div>
    
    </div>
    </div>
  )
  ))

}



</div>



        
    </div>
  )
}

export default ReviewSection;