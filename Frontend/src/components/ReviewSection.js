import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { fetchReviewData } from '../store/dataSlice.js';
import star from "../assets/Brandlogo/rating.png";

function ReviewSection() {
  const dispatch = useDispatch();
  const { reviewData, loadingReview, errorReview } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchReviewData());
  }, []);

  return (
    <div className="reviewContainer px-4 sm:px-10 py-6">
      <div className="reviewHeading flex justify-center">
        <h1 className="text-xl sm:text-2xl font-semibold">Reviews & Comments</h1>
      </div>

      {loadingReview ? (
        <div className="text-gray-500 text-sm pt-5">Loading reviews...</div>
      ) : (
        reviewData?.data?.map((reviewDataMap, index) => (
          <div key={index} className="reviewChildContainer mt-6 border-b pb-4">
            <div className="uperReviewContainer space-y-2">
              {/* Username and Rating */}
              <div className="userNameContainer flex flex-wrap items-center gap-2">
                <h1 className="text-base font-medium text-gray-800">{reviewDataMap.userId.firstname}</h1>
                <div className="ratings flex items-center gap-1 text-base text-yellow-600">
                  <span>{reviewDataMap.rating}</span>
                  <img src={star} alt="star" className="h-4 sm:h-5" />
                </div>
              </div>

              {/* Comment */}
              <div className="commentContainer text-sm sm:text-base text-gray-700">
                <p>{reviewDataMap.comment}</p>
              </div>

              {/* Images */}
              {reviewDataMap.imgUrl.length > 0 && (
                <div className="imageReview flex flex-wrap gap-3 pt-2">
                  {reviewDataMap.imgUrl.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt="Review"
                      className="h-16 w-16 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewSection;
