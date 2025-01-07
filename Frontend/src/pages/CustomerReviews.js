import React, { useState } from 'react';
import Star from "../assets/Brandlogo/Star.png";
import axios from "axios";
import "../assets/Style/Headings.css"

function CustomerReviews() {
  const [prevNo, setPrevNo] = useState(0);
  const [imageSelected, setImageSelected] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [comment,setComment]=useState("");
  const [rating,setRating]=useState("");
//   const [imgUrl,setImgUrl]=useState([]);
  const [userId,setUserId]=useState("66d37126494b26924f9f0a4d");
  const [productId,setProductId]=useState("66cb21115ded4d82f9def494");

//   const [userId,productId]=req.body;

  const uploadImagesToCloudinary = async () => {
    if (!imageSelected) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'CustomerReviewImages');


    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/shekkhu/image/upload`, formData);


      setUploadResponse( response.data.secure_url ); 
    //   setImgUrl(response.data.secure_url);

    //   console.log(imgUrl);

      const reviewData={

        userId,
        productId,
        comment,
        rating,
        imgUrl:response.data.secure_url,


    }


      const response2= await axios.post(`http://localhost:1000/users/userreview`,reviewData);
      console.log(response2);
        // Store the response data if needed
     
    //   console.log("this is url:",imgUrl);
      
    //   console.log("Uploaded image:", response.data);



      
    } catch (err) {
      console.error("Error uploading image to Cloudinary:", err);
    }
  };

  const handleStars = (e) => {
    const targetN = Number(e.target.id);
    const images = document.querySelectorAll('#starsContainer img');

    if (prevNo <= targetN) {
      for (let i = 0; i < targetN; i++) {
        images[i].style.backgroundColor = 'yellow';
      }
    }

    for (let i = targetN; i < 5; i++) {
      images[i].style.backgroundColor = 'white';
    }

    setPrevNo(targetN);
    setRating(targetN)
  };

  return (
    <div className='customerReviewContainer h-screen'>
      <div className='childContainerReview bg-green-800 pt-5 h-full flex justify-center items-center flex-col'>
        <h1 className='headingText text-5xl text-white HeadingPlayFair' >Review Section</h1>
        <div className='writeAndImageContainer  bg-gray-50 h-full w-full flex flex-col justify-center items-center rounded-lg'>
          <div className='textStar'>
            <label className='text-xl '>Ratings</label>
          </div>

          <div className='ratingsContainer flex pb-3' id="starsContainer">
            <img className='starImage rounded-full w-6 hover:cursor-pointer' id="1" src={Star} onClick={handleStars} />
            <img className='starImage rounded-full w-6 hover:cursor-pointer' id="2" src={Star} onClick={handleStars} />
            <img className='starImage rounded-full w-6 hover:cursor-pointer' id="3" src={Star} onClick={handleStars} />
            <img className='starImage rounded-full w-6 hover:cursor-pointer' id="4" src={Star} onClick={handleStars} />
            <img className='starImage rounded-full w-6 hover:cursor-pointer' id="5" src={Star} onClick={handleStars} />
          </div>

          <div className='inputImage'>
            <label className='text-xl'>Upload an Image:</label>
            <input type="file" onChange={(event) => setImageSelected(event.target.files[0])} required />
          </div>

          <div className='inputText flex pt-4'>
            <label className='text-xl pr-2'>Write your Review:</label>
            <textarea rows={5} cols={40} className='pl-2' onChange={(e)=>setComment(e.target.value)} required />
          </div>

          <div className='btnSubmitreviewContainer pt-7'>
            <button className='submitReviewBtn border border-black border-solid rounded h-7 w-24 bg-green-500 text-white' onClick={uploadImagesToCloudinary}>
              Submit
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerReviews;
