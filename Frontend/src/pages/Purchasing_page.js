import React, { useEffect,useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import ferrari from "../assets/images/ferrari.jpg";
import "../assets/Style/purchasingPage.css"
// import ProductSlider from "../components/ProductSlider.js";
import { useSelector,useDispatch } from 'react-redux';
import { setSimiliarProduct,SimiliarProduct,counterSlice , setProducts} from '../store/dataSlice.js';
import { Link } from 'react-router-dom';
import star from "../assets/Brandlogo/rating.png"
import Header from '../components/HeaderChange.js';
import { increment,refreshToken} from '../store/dataSlice.js';
import {setProductData} from "../store/dataSlice.js"
import Cookies from "universal-cookie"
import {fetchID} from "../Services/apiService.js";
import Footer from "../components/Footer.js";
import BuyButton from "../components/BuyButton.js"
import { useParams } from "react-router-dom";
import {fetchData,fetchReviewData,fetchUserID,fetchBagTotal2,fetchAddToBag,changeButtonText,resetButtonText} from "../store/dataSlice.js";
import ReviewSection from "../components/ReviewSection.js"


function Purchasing_page() 
{
  const cookie =new Cookies();
  const navigate=useNavigate();

  const data = useSelector(state => state.data.data);  // Access the inner `data` object
  const error = useSelector(state => state.data.error);  // Access `error` state
  const loading = useSelector(state => state.data.loading);
  const { reviewData, loadingReview, errorReview } = useSelector((state) => state.review);
  const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
  const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
  const { totalBag,statusTotalBag,errorBagTotal,}=useSelector((state)=>state.fetchBagTotalStore);
  const {  bagItem, statusItem,errorItem}=useSelector((state)=>state.quantityItemBag);
  const { buttonText, statusButtonText, errorButtonText } = useSelector((state) => state.changeButtonText);
  //  console.log("Token from redux store>>>>>>>>",token);


  const {id}=useParams();

console.log("Data coming from fetch dataaa?????",data)
console.log("Data coming from review dataaa?????",reviewData)
//these are data container and we will use redux to store these data

  const product = useSelector(state => state.product.product); // Access the product data from Redux store
  const [productSlice2,setProductSlice2]=useState({});
  console.log("data is here of reduct productslice2>>>>>>>>",product)//<<<<<data coming here from productSlice2 dataslice file and from store





  const similiarData=useSelector(state=>state.similiarproductstore.dataSimiliar);  //fix data here carry all these data to localStorage or redux persist all these purchase page data:-
  const [apiData,setApiData]=useState(JSON.parse(localStorage.getItem("apiData")));
  const [productColors, setProductColors] = useState([]);
  const [timer,setTimer]=useState(true);



 useEffect(()=>{

  dispatch(fetchData(id));
  

 },[id])


 useEffect(()=>{




if (!loading) { 

  if (data && data.product_color) {
    setApiData(data);
    setProductColors(data.product_color);
  }

  setTimer(false);
 
}



 },[loading]);  





  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setProductSlice2(product);
      console.log("data of product is here??????",product);
    }
  }, [product]);


useEffect(()=>{



 dispatch(increment(totalBag)); //Increament by 1:



},[totalBag])


 
  

  const [magnifier,setMagnifier]=useState({});

 
  
  const [reviewState,setReviewState]=useState([]);//reviewData coming by redux
 
  const [picUrl,setPicUrl]=useState("");
  const [color,setColor]=useState( data?.product_color?.[0]?.color || '' );
  const [totalItemsCart,setTotalItemsCart]=useState(localStorage.getItem("itemsCart"));

  const [buttonClick2,setButtonClick2]=useState(false);

  const [loading2,setLoading2]=useState(true);


  const dispatch=useDispatch();
  

  useEffect( () => {

 
 
    const sendUserIds = async () => 
    
    {
      
    try{

  
   dispatch(resetButtonText());
    setButtonClick2(false);
   
    const Ids = {
      userId: UserID,
      productId: id,  // Use the value passed in
    };  

    // const sendIDS = await axios.post("http://localhost:1000/users/changetext", Ids);

    dispatch(changeButtonText(Ids));

     console.log("buttonText",buttonText)

   
  } catch (error) {
    console.error("Error adding product to cart:", error);
  } finally {
    setLoading2(false);
  }
};

sendUserIds();
 
}, []);



useEffect(() => {

  setButtonClick2(false);

  if (!UserID || !id) return;

  const Ids = {
    userId: UserID,
    productId: id,
  };

  dispatch(changeButtonText(Ids));
 
  if(buttonText === 200) {
    setButtonClick2(true);
  }

}, [dispatch,buttonText]);



  


   useEffect(() => {
    if (data && data.product_color && data.product_color.length > 0) {
      setColor(data.product_color[0].color); // Only set color if array exists and has elements
    }
  }, [data]);

  useEffect(()=>{

    
localStorage.setItem("cartItems",totalItemsCart);



},[totalItemsCart])

useEffect(()=>{

 

  const InitialCartSetup=async()=>{

    // if(!localStorage.getItem("accessToken"))return;

    if(!UserID)
    {
      return;
    }


  // let totalCart=await axios.post("http://localhost:1000/users/showtotal",{userId:UserID});
  // console.log("this is total cart items",totalCart.data.totalQuantity);

  dispatch(fetchBagTotal2({ ID: UserID })); // Fetch updated total quantity
   
 
  }

  InitialCartSetup();
},[UserID])


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
}, [data]);


  useEffect(()=>{

   const datas=async ()=>{

    if(data && data.product_image && data.product_name)
    {

     dispatch(fetchReviewData()) 

     dispatch(setProductData({

      image: data.product_image,
      name: data.product_name,
      details: data.product_details,
      description: data.description,
      price: data.price,
      rating: data.rating,
      id: data._id

     })); 
    
     
    


     
    
     
      
  
      
 

    }


  }

  datas();

  },[data])



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  console.log("this is reviewState Data brooooooooooooooooo",reviewState);
 
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

    const IDS=UserID;

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
    dispatch(resetButtonText());
    setButtonClick2(false);
    if(!token)
    {
     return navigate("/users/login");
    }

    // const ID=await fetchID(token);

    console.log("id is here Encrypted ID",UserID,id)
    const Ids={userId:UserID,productId:id,Signal:false};

    const showTotalId = { ID: UserID }; // Wrap userID in an object

 
    // alert(showTotalId);
    dispatch(fetchBagTotal2(showTotalId))
    
    // const response=await axios.post("http://localhost:1000/users/showtotal", showTotalId);
    
    // console.log(response.data.totalQuantity);
    
    
   //tommorow task is :- shift all apis to async thunk and don't call api multiple times unless it neccessary call api on only when component load and store it into redux.

   dispatch(fetchAddToBag(Ids))
    // const sendIDS=await axios.post("http://localhost:1000/users/addbag",Ids); 

    // console.log("this is  total cart items",sendIDS.status)
 dispatch(changeButtonText({
  userId: UserID,
  productId: id
}));

setButtonClick2(true);
    
    const sendUserIds = async () => {
      try {
        console.log("Triggered by button click");
       

        const ID=UserID;
   
        if(!ID)
        {
          return ;
        }
        

        const Ids = {
          userId: ID,
          productId: product.id
        };
      //  console.log("IDS hereeee......",Ids);

       
        // const sendIDS = await axios.post("http://localhost:1000/users/changetext", Ids);
       
        console.log("Response status:",buttonText);
  
        // if(buttonText === 200)
        // {

        //   console.log("Product already exists in the cart");
        //   setButtonClick2(true);

        // }

        // let totalCart=await axios.post("http://localhost:1000/users/showtotal",{userId:Ids.userId});

        const dataSend={ID: UserID,}

        dispatch(fetchBagTotal2( dataSend )); // Fetch updated total quantity
      
        dispatch(increment(totalBag));

      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    };
  
    if(statusItem==='succeeded')
    {
      console.log("yes baby i am inside this function")
sendUserIds();
    }
    // const timer = setTimeout(() => {
      
    // }, 1000); // 1-second delay
  
    // return () => clearTimeout(timer);
  }

  const handleColorClick = (color) => {
    setColor(color); // Set the clicked color as the selected color
    console.log("holaaaaaaa similiarrrrrrr",similiarData)
  };



  // if (timer) {
  //   return <p className="loading-text text-center text-xl">Loading...Hello worlddddd</p>;
  // }

 
  console.log("here is my productSlice2 Data >>>>>>",product);
 
  
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
<h1 className='text-3xl' id="imagez"> {productSlice2.name} </h1>
</div>

<div className="ratingsContainer flex items-center">
 <h1 className='text-base'>Ratings:</h1><span className="ratingStars text-base" >{productSlice2.rating}</span> 
 <img src={star} className='h-5'></img>

</div>

<div className='textCont pt-1'>
<h1 className="text-2xl">Price:₹{productSlice2.price}</h1>
</div>
<div className="detailsCont pt-2 ">
  <h1 className='text-2xl'>{productSlice2.details}</h1>
  </div>
  <div className="descriptionCont w-4/5">
  <h1 className="">{productSlice2.description}</h1>
  </div>
  <div className="purchaseBtn  flex w-1/3 pl-4  justify-around pt-8">
  {/* <button className="btn text-base  w-2/4 h-10 rounded-md mr-2 text-white bg-orange-400" onClick={handleBuyButton}>Buy</button> */}
  <BuyButton></BuyButton>
  {    //fix go to cart logic dispatch dispatch(fetchBagData(UID));
     buttonClick2 ? <button className="btn text-base  text-white w-2/4 h-10 rounded-md ml-2 bg-green-400" onClick={()=>navigate("/users/shipping")}>Go to Cart</button>: <button className="btn text-base  text-white w-2/4 h-10 rounded-md ml-2 bg-green-400" onClick={handleAddtoCart} >Add to Cart</button>
 
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
  productColors.map((item,index)=>(

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



{/* <div className="reviewContainer  ">

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



</div> */}


<ReviewSection></ReviewSection>




</div>

</div>
</div>



{/* <Footer></Footer> */}

</div>

  
  )}

export default Purchasing_page