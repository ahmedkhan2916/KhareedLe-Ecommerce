import React, { useEffect,useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import ferrari from "../assets/images/ferrari.jpg";
import "../assets/Style/purchasingPage.css"
// import ProductSlider from "../components/ProductSlider.js";
import { useSelector,useDispatch } from 'react-redux';
import { setSimiliarProduct,SimiliarProduct,counterSlice } from '../store/dataSlice.js';
import { Link } from 'react-router-dom';
import star from "../assets/Brandlogo/rating.png"
import Header from '../components/HeaderChange.js';
import { increment } from '../store/dataSlice.js';
import Cookies from "universal-cookie"



function Purchasing_page() 
{
  const cookie =new Cookies();
  const navigate=useNavigate();
  const data = useSelector(state => state.data.data);  // Access the inner `data` object
  const error = useSelector(state => state.data.error);  // Access `error` state
  const loading = useSelector(state => state.data.loading);
  const userId = useSelector(state=>state.userId.userId);
  
  // localStorage.setItem("userID",userId);
  console.log("this is data error",data);
  // localStorage.setItem("productColor",JSON.stringify(data.product_color));

  console.log("this is my api data",JSON.parse(localStorage.getItem("apiData")))
  const apiData=JSON.parse(localStorage.getItem("apiData"));
  console.log("this is stored api data",apiData.product_color);

  // const arrayBackProductColor= || [];
  // console.log(arrayBackProductColor)
  console.log("this is my userId",userId);
 
  const [pic,setPic]=useState(localStorage.getItem("productImage"));
  const [productName,setProductName]=useState(localStorage.getItem("productName"));
  const [details,setDetails]=useState(localStorage.getItem("details"));
  const [description,setDescription]=useState(localStorage.getItem("description"));
  const [price,setPrice]=useState(localStorage.getItem("price"));
  const [rating,setRating]=useState(localStorage.getItem("rating"));
  const [magnifier,setMagnifier]=useState({});
  const [reData,setReData]=useState([]);
  const [picUrl,setPicUrl]=useState("");
  const [color,setColor]=useState( data?.product_color?.[0]?.color || '' );
  const [totalItemsCart,setTotalItemsCart]=useState(localStorage.getItem("itemsCart"));
  const [dataComing,setDataComing]=useState();
  const [buttonClick,setButtonClick]=useState();
  const [buttonClick2,setButtonClick2]=useState(false);
  const [buttonText,setButtonText]=useState("");
   const [loading2,setLoading2]=useState(true);
  const dispatch=useDispatch();

  //  console.log(loca);
  //Error occuring here Error No:-1
  useEffect(() => {
    const sendUserIds = async () => {
      try {

        console.log("Triggered by button click"); 
        const Ids = {
          userId: localStorage.getItem("userID"),
          productId: localStorage.getItem("productID"),
        };  
      
        
        
  
        const sendIDS = await axios.post("http://localhost:1000/users/changetext", Ids);
  
        console.log("Response status:", sendIDS.status);
  
        if (sendIDS.status === 200) {
          console.log("Product already exists in the cart");
          console.log("this is my product ID",Ids.productId);
          setButtonClick2(true);
        }

        console.log("this is my product ID",Ids.productId);

      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
      finally{
        setLoading2(false);
      }
    };
  
    const timer = setTimeout(() => {
      sendUserIds();
    }, 1000); // 1-second delay
  
    return () => clearTimeout(timer); // Cleanup function
  }, []);
  


   useEffect(() => {
    if (data && data.product_color && data.product_color.length > 0) {
      setColor(data.product_color[0].color); // Only set color if array exists and has elements
    }
  }, [data]);

  useEffect(()=>{

    
localStorage.setItem("cartItems",totalItemsCart);



},[totalItemsCart])



  useEffect(()=>{


    if(data && data.product_image && data.product_name)
    {



      // similiar product api
      const api=axios.get(`http://localhost:1000/users/update?value=${data.price}`).then(response=>dispatch(setSimiliarProduct(response.data))).catch((err)=>console.log(err));


      // costumer reviews api
     const reviewData= axios.get('http://localhost:1000/users/fetchuser').then(res=>setReData(res.data.data));

      console.log("description_data",data.description);
      cookie.set("productName", data.product_name, { path: "/", maxAge: 3600 });
      localStorage.setItem("productImage",data.product_image);
      localStorage.setItem("productName",data.product_name);
      localStorage.setItem("details",data.product_details);
      localStorage.setItem("description",data.description);
      localStorage.setItem("price",data.price);
      localStorage.setItem("rating",data.rating);
      localStorage.setItem("productID",data._id);
      
    
      setPic(localStorage.getItem("productImage"));
      setProductName(localStorage.getItem("productName"));
      setDetails(localStorage.getItem("details"));
      setDescription(localStorage.getItem("description"));
      setPrice(localStorage.getItem("price"));
      setRating(localStorage.getItem("rating"));

    }
  },[data])

  const similiarData=useSelector(state=>state.similiarproductstore.dataSimiliar);

  console.log(similiarData)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(reData);

  const handleMouseOver=(e)=>{

    const {top,left,width,height}=e.target.getBoundingClientRect();
   
    
    setPicUrl(e.target.src);

    const x=e.clientX-left;
    const y=e.clientY-top;

    const backgroundX=(x/width)*100;
    const backgroundY=(y/height)*100;

    setMagnifier({

      opacity:1,
      top:`${y-50}px`,
      left:`${x-50}px`,
      backgroundPosition:`${backgroundX}% ${backgroundY}% `,

    });
  } 

  const handleMouseLeave=()=>{

    setMagnifier({
      opacity:0
    });
  }

  const handleAddtoCart=async()=>{

    
    console.log(localStorage.getItem("userID"));

    const Ids={userId:localStorage.getItem("userID"),productId:localStorage.getItem("productID")};

const showTotalId = { userId: localStorage.getItem("userID") }; // Wrap userID in an object

const response=await axios.post("http://localhost:1000/users/showtotal", showTotalId);
      
    console.log(response.data.totalQuantity);
    
    


    const sendIDS=await axios.post("http://localhost:1000/users/addbag",Ids); 

    console.log("this is  total cart items",sendIDS.status)

    
    const sendUserIds = async () => {
      try {
        console.log("Triggered by button click");
        const Ids = {
          userId: localStorage.getItem("userID"),
          productId: localStorage.getItem("productID"),
        };
  
        const sendIDS = await axios.post("http://localhost:1000/users/changetext", Ids);
  
        console.log("Response status:", sendIDS.status);
  
        if (sendIDS.status === 200) {
          console.log("Product already exists in the cart");
          setButtonClick2(true);
        }

        let totalCart=await axios.post("http://localhost:1000/users/showtotal",{userId:Ids.userId});
        dispatch(increment(totalCart.data.totalQuantity));

      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    };
  
    const timer = setTimeout(() => {
      sendUserIds();
    }, 30); // 1-second delay
  
    return () => clearTimeout(timer);



  }

  const handleColorClick = (color) => {
    setColor(color); // Set the clicked color as the selected color
  };

  //send userId and ProductId for track user product Items:-
  // const handleItemCounting=async()=>{

    // dispatch(increment());


  //  console.log(localStorage.getItem("userID"));

//     const Ids={userId:localStorage.getItem("userID"),productId:localStorage.getItem("productID")};

// const showTotalId = { userId: localStorage.getItem("userID") }; // Wrap userID in an object

// const response=await axios.post("http://localhost:1000/users/showtotal", showTotalId);
      
//     console.log(response.data.totalQuantity);
    
//     dispatch(increment(dataComing));


//     const sendIDS=await axios.post("http://localhost:1000/users/addbag",Ids); 

//     console.log("this is  total cart items",sendIDS.status)

    // setTotalItemsCart(sendIDS.data.bag.length); 
    // console.log("this is count data:",);
  
  // }

  if (loading2) {
    return <p className="loading-text text-center text-xl">Loading...</p>;
  }
  
  return(
<div className=''>
  
  <Header></Header>

 

<div className='pageContainer pt-28'>

<div className="detailsPageContainer flex  h-screen ">
{/* <h1 className='productText text-3xl'>Products</h1> */}
<div className='leftContainer  flex flex-col w-1/3 '>

<div className='image-container h-max overflow-y-scroll overflow-x-hidden rounded-xl'>
  {
    apiData.product_color
      .filter((item) => item.color === color) // Filter based on selected color
      .map((item) => (
        <div key={item.color}>
          {
            item.image_urls.map((url, index) => (
              <img key={index} src={url} alt={`${color} image`} onMouseMove={handleMouseOver} onMouseLeave={handleMouseLeave}/>
            ))
          }
        </div>
      ))
  }
</div>


<div className="magnifier rounded-md"

style={{

...magnifier,
backgroundImage:`url(${picUrl})`

}}>
</div>
</div>


{/* it's a right container of purchasing page */}
<div className='rightContainer w-8/12 '>

<div className='rightDetailCont pt-12 flex flex-col items-center'>

<div className='textCont'>
<h1 className='text-3xl' id="imagez"> {productName} </h1>
</div>

<div className="ratingsContainer flex items-center">
 <h1 className='text-base'>Ratings:</h1><span className="ratingStars text-base" >{rating}</span> 
 <img src={star} className='h-5'></img>

</div>

<div className='textCont pt-1'>
<h1 className="text-2xl">Price:₹{price}</h1>
</div>
<div className="detailsCont pt-2 ">
  <h1 className='text-2xl'>{details}</h1>
  </div>
  <div className="descriptionCont w-4/5">
  <h1 className="">{description}</h1>
  </div>
  <div className="purchaseBtn  flex w-1/3 pl-4  justify-around pt-8">
  <button className="btn text-base  w-2/4 h-10 rounded-md mr-2 text-white bg-orange-400" >Buy</button>
  {
    buttonClick2? <button className="btn text-base  text-white w-2/4 h-10 rounded-md ml-2 bg-green-400" onClick={()=>navigate("/users/shipping")}>Go to Cart</button>: <button className="btn text-base  text-white w-2/4 h-10 rounded-md ml-2 bg-green-400" onClick={handleAddtoCart}>Add to Cart</button>
 
  }
</div>  
</div>

<div className='color&StorageOfPhonesContainer w-11/12 flex justify-center pl-20 pt-14'>

  <div className='childContainerColor&Storage  w-full flex '>
    
    <div className='leftChildColor&Storage  w-1/2  flex items-center'>
      <div className='leftChildContainer '>

        <div className='headingColorAndStorage'>

          <span className='text-base'>Colors</span>

        </div>

      </div>

      <div className='rightChildContainer w-full'>

    <div className='containerVariants flex w-full justify-evenly'>

{
  apiData.product_color.map((item,index)=>(

      <div className='colorImages w-16 h-16 bg-cover bg-red-400 border-2 border-solid ' key={index} style={{backgroundImage:`url(${item.image_urls?.[0]})`}} onClick={()=>handleColorClick(item.color)}>

        
      </div>

))}    
      

    </div>



      </div>



    </div>

    <div className='rightChildColor&Storage w-1/2 flex items-center'>

    <div className='leftChildContainer '>

    <div className='headingColorAndStorage'>

<span className='text-base'>Storage</span>


</div>

</div>

<div className='rightChildContainer w-5/12 '>

<div className='containerVariants flex w-full justify-around'>

<div className="storageVarient border-solid border-2 border-blue-400 pl-2 pr-2">

  <span className=' text-base text-blue-400'>128 GB</span>

</div>

<div className="storageVarient border-solid border-2 border-gray-300 pl-2 pr-2">

  <span className=' text-base'>256 GB</span>

</div>




</div>


</div>

    </div>

  </div>

</div>


<div className='suggestItems  pt-12'>

   <div className="similiarProductContainer flex justify-center">

    <h1 className="text-base">Similiar Products</h1>

    </div> 


{/* similiar product Container */}
<div className='productDetailsCont mt-12 flex'>
{
   
    similiarData.map((item)=>(
<div className='productContainer  ml-16 border-t-2 border-l-2 border-r-2 border-b-2' key={item._id} data-id={item._id} >
<Link to="/product">
    <div className='image w-full'>
{/* <img className='imageProduct w-full' style={{backgroundImage:`url('/images/ferrari.jpg')`}}></img> */}
<div className='phDiv w-full' style={{backgroundImage:`url(${item.product_image})`}}>

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







</div>


<div className="reviewContainer  ">

<div className='reviewHeading flex justify-center pt-10'>
    <h1 className='text-2xl'>Reviews & Comments</h1>

  </div>



  {
  reData.map((reviewDataMap)=>(
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

  ))
}



</div>





</div>

</div>
</div>


</div>

  
  )}

export default Purchasing_page