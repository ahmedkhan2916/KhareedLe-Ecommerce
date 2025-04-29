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
import {fetchID} from "../Services/apiService.js";
import Footer from "../components/Footer.js";
import BuyButton from "../components/BuyButton.js"


function Purchasing_page() 
{
  const cookie =new Cookies();
  const navigate=useNavigate();
  const data = useSelector(state => state.data.data);  // Access the inner `data` object
  const error = useSelector(state => state.data.error);  // Access `error` state
  const loading = useSelector(state => state.data.loading);
  const userId = useSelector(state=>state.username.userId);
  const similiarData=useSelector(state=>state.similiarproductstore.dataSimiliar);  //fix data here carry all these data to localStorage or redux persist all these purchase page data:-
  console.log("this is similiarDataaaa here",similiarData);
  const apiDataRedux=useSelector(state=>state.data.data)   //bug occuring here give localStorage data here which not be perished
  const [apiData,setApiData]=useState(JSON.parse(localStorage.getItem("apiData")));
  const [productColors, setProductColors] = useState([]);
  const [timer,setTimer]=useState(true);


  console.log("this is data coming in purchasing page",data);
    // localStorage.setItem("userID",userId);
  // localStorage.setItem("productColor",JSON.stringify(data.product_color));

 


 useEffect(()=>{

//  setTimeout( () => {
//     setApiData(JSON.parse(localStorage.getItem("apiData")))
//     if (apiData && apiData.product_color){

  //       setProductColors(apiData.product_color);
  //       setTimer(false);
  //     }
  //     // setTimer(false);
  //   console.log("Yes this is Interval Timeeeeeeeee");
  //   },1000);
  // setTimeout(()=>{
  //   setApiData(JSON.parse(localStorage.getItem("apiData")))
  //   if (apiData && apiData.product_color) {     
  //     setProductColors(apiData.product_color);
  //   }
  //   setTimer(false);
  // },1000)

//   if(loading===true)
// {

//     setApiData(JSON.parse(localStorage.getItem("apiData")));
//     setProductColors(apiData.product_color);
//     setTimer(false);
//     console.log("data coming here smoothlyyyyyyy",loading);

// }


if (!loading) { // Run only when loading becomes false
  const storedData = JSON.parse(localStorage.getItem("apiData"));

  if (storedData && storedData.product_color) {
    setApiData(storedData);
    setProductColors(storedData.product_color);
  }

  setTimer(false);
  console.log("Data updated:", storedData);
}



 },[loading]);  

 

   console.log("this data is coming productColorssssss",productColors);

  // useEffect(() => {
  //   // Extract product_color from apiData and update state

 
    
  //   if (apiData && apiData.product_color) {
  //     setProductColors(apiData.product_color);
  //   }
  // }, [apiData]);


  console.log("this is my api data",productColors);



  // useEffect(() => {
  //   // Attempt to fetch `apiData` from localStorage on component mount
  //   const storedData = localStorage.getItem("apiData");

  //   if (storedData) {
  //     setApiData(JSON.parse(storedData));
  //   } else {
  //     // Simulate an API call or localStorage update
  //     const fetchApiData = async () => {
      
  //       // localStorage.setItem("apiData", JSON.stringify(data));
  //       setApiData(data);
  //     };

  //     fetchApiData();
  //   }
  // }, []);



    // const apiData=JSON.parse(localStorage.getItem("apiData"));
    // console.log("this is stored api data",apiData.product_color);
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

  const [reData, setReData] = useState(() => {
    const stored = localStorage.getItem("reData");
    return stored ? JSON.parse(stored) : [];
  });   //lazy Initializer approach i am using here...:-
  
 
  const [picUrl,setPicUrl]=useState("");
  const [color,setColor]=useState( data?.product_color?.[0]?.color || '' );
  const [totalItemsCart,setTotalItemsCart]=useState(localStorage.getItem("itemsCart"));
  const [dataComing,setDataComing]=useState();
  const [buttonClick,setButtonClick]=useState();
  const [buttonClick2,setButtonClick2]=useState(false);
  const [buttonText,setButtonText]=useState("");
  const [loading2,setLoading2]=useState(true);
  const [cookPID,setCookPID]=useState("");
  const [similiarProduct,setSimiliarProduct]=useState(JSON.parse(localStorage.getItem("similiarP")));
  const dispatch=useDispatch();
  

 
  useEffect(()=>{

    const fetchProductId = async () => {
      try {
       
        const response = await axios.get("http://localhost:1000/users/getProductId", {
          withCredentials: true, // Ensure cookies are sent with request
        });
    
        console.log("Product ID from Backend Cookies:", response.data.productID);
        setCookPID(response.data.productID)
        const timer = setTimeout(() => {
              sendUserIds();
            }, 2500);
       
        // return response.data.productID; // Use this productID as needed
        return () => clearTimeout(timer); // Cleanup function
    
      } catch (error) {
        console.error("Error fetching product ID:", error);
        return null;
      }
    };

    fetchProductId();

  },[cookPID])

  const sendUserIds = async (req,res) => {
    try {
     
      console.log("Triggered by button click"); 
      const ID=await fetchID(localStorage.getItem("accessToken"));

      if(!ID)
      {

        //  alert("198 line no on purchasePage ID not Defined");
         return;

      }
      const Ids = {
        userId: ID,
        productId: cookPID,
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

  //  console.log(loca);
  //Error occuring here Error No:-1
  // useEffect(() => {
  //   const sendUserIds = async (req,res) => {
  //     try {
       
  //       console.log("Triggered by button click"); 
  //       const ID=await fetchID(localStorage.getItem("accessToken"));

  //       alert(cookPID)
  //       const Ids = {
  //         userId: ID,
  //         productId: cookPID,
  //       };  
      
        
        
  
  //       const sendIDS = await axios.post("http://localhost:1000/users/changetext", Ids);
  
  //       console.log("Response status:", sendIDS.status);
  
  //       if (sendIDS.status === 200) {
  //         console.log("Product already exists in the cart");
  //         console.log("this is my product ID",Ids.productId);
  //         setButtonClick2(true);
  //       }

  //       console.log("this is my product ID",Ids.productId);

  //     } catch (error) {
  //       console.error("Error adding product to cart:", error);
  //     }
  //     finally{
  //       setLoading2(false);
  //     }
  //   };
  
  //   const timer = setTimeout(() => {
  //     sendUserIds();
  //   }, 1000); // 1-second delay
  
  //   return () => clearTimeout(timer); // Cleanup function
  // }, []);
  
  useEffect(() => {
    localStorage.setItem("reData", JSON.stringify(reData));
  }, [reData]);  //refresh automatically when data will added in review database


   useEffect(() => {
    if (data && data.product_color && data.product_color.length > 0) {
      setColor(data.product_color[0].color); // Only set color if array exists and has elements
    }
  }, [data]);

  useEffect(()=>{

    
localStorage.setItem("cartItems",totalItemsCart);



},[totalItemsCart])




useEffect(() => {
  const fetchSimilarProducts = async () => {
    if (data && data.price) {
      try {
        const response = await axios.get(`http://localhost:1000/users/update?value=${data.price}`);
        
        if (response.data) {
          dispatch(setSimiliarProduct(response.data)); // Update Redux store
          console.log("Fetched similar data:", response.data);
        } else {
          console.log("No similar products found.");
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    }
  };

  fetchSimilarProducts();
}, [data, dispatch]);


  useEffect(()=>{

   const datas=async ()=>{

    if(data && data.product_image && data.product_name)
    {
   console.log("yes i am hereeee babbyyyyyy in data is coming correctly");
      // similiar product api
      // const api=await axios.get(`http://localhost:1000/users/update?value=${data.price}`).then(response=>dispatch(setSimiliarProduct(response.data))).catch((err)=>console.log(err));
      //  console.log("this is similiar data dispatch",api);
      // costumer reviews api
     const reviewData= await axios.get('http://localhost:1000/users/fetchuser')
     localStorage.setItem("reData",JSON.stringify(reviewData.data.data));
     // .then(res=>localStorage.setItem("reData",JSON.stringify(res.data.data)));
    
      console.log("reviewData",reviewData.data.data)  ///bug is here showing undefined here...>>>>
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
      const data1 = localStorage.getItem("reData");
      if (data1) {
        const parsedData = JSON.parse(data1);
        setReData(parsedData); // Store in state
      }
      setProductName(localStorage.getItem("productName"));
      setDetails(localStorage.getItem("details"));
      setDescription(localStorage.getItem("description"));
      setPrice(localStorage.getItem("price"));
      setRating(localStorage.getItem("rating"));

    }


  }

  datas();

  },[data])

// useEffect(()=>{

//     console.log("this is similiar Dataaaa in useEffect",similiarData)

//     localStorage.setItem("similiarP",similiarData);

//     setSimiliarProduct(localStorage.getItem("similiarP"));

//   },[similiarData])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("this is reDataaa brooooooooooooooooo",reData);
 
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

  const handleBuyButton=async()=>{

    const IDS=await fetchID(localStorage.getItem("accessToken"));

    const Ids={userId:IDS,productId:localStorage.getItem("productID")};
    navigate("/users/shipping")


    try{

    const sendIDS=await axios.post("http://localhost:1000/users/addbag",Ids); 
    
    
    }
    catch(error)
    {
      return console.error("this is error in buy button",error)
        
     }

  }



  const handleAddtoCart=async()=>{

    
    // console.log(localStorage.getItem("userID"));

    if(!localStorage.getItem("accessToken"))
    {
     return navigate("/users/login");
    }

    const ID=await fetchID(localStorage.getItem("accessToken"));

    console.log("id is here Encrypted ID",ID)

    const Ids={userId:ID,productId:localStorage.getItem("productID")};

    const showTotalId = { userId: ID }; // Wrap userID in an object

    const response=await axios.post("http://localhost:1000/users/showtotal", showTotalId);
    
    console.log(response.data.totalQuantity);
    
    


    const sendIDS=await axios.post("http://localhost:1000/users/addbag",Ids); 

    console.log("this is  total cart items",sendIDS.status)

    
    const sendUserIds = async () => {
      try {
        console.log("Triggered by button click");
       

        const ID=await fetchID(localStorage.getItem("accessToken")); 
   
        if(!ID)
        {
          return ;
        }
        

        const Ids = {
          userId: ID,
          productId: localStorage.getItem("productID"),
        };
  
        const sendIDS = await axios.post("http://localhost:1000/users/changetext", Ids);
  
        console.log("Response status:", sendIDS.status);
  
        if (sendIDS.status === 200) {

          console.log("Product already exists in the cart");
          setButtonClick2(true);

        }

        let totalCart=await axios.post("http://localhost:1000/users/showtotal",{userId:Ids.userId});
        // console.log("this is total cart items",totalCart.data.totalQuantity);
         
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
    console.log("holaaaaaaa similiarrrrrrr",similiarData)
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

  if (timer) {
    return <p className="loading-text text-center text-xl">Loading...Hello worlddddd</p>;
  }

  console.log("this is the localStorage reData",localStorage.getItem("reData"));
  console.log("this is the reData State Data",reData)
  
  
  
  return(
<div className=''>
  
  <Header></Header>

 

<div className='pageContainer pt-28'>

<div className="detailsPageContainer flex  h-screen ">
{/* <h1 className='productText text-3xl'>Products</h1> */}
<div className='leftContainer  flex flex-col w-1/3 '>

<div className='image-container h-max overflow-y-scroll overflow-x-hidden rounded-xl'>

  
  {
    
 productColors
      .filter((item) => item.color === `${!color?"Black":color}` ) // Filter based on selected color
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
  {/* <button className="btn text-base  w-2/4 h-10 rounded-md mr-2 text-white bg-orange-400" onClick={handleBuyButton}>Buy</button> */}
  <BuyButton></BuyButton>
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



{/* <Footer></Footer> */}

</div>

  
  )}

export default Purchasing_page