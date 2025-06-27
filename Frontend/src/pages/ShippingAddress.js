import React from 'react'
import DeleteIcon from "../assets/Brandlogo/trash.png"
import { useState ,useEffect} from 'react';
import "../assets/Style/shipping.css"
import bag from "../assets/images/shoppingbag3.png";
import Header from '../components/HeaderChange';
import axios from "axios";
import "../assets/Style/Headings.css"
import { redirect } from 'react-router-dom';
import {fetchID} from "../Services/apiService.js"
import {fetchBagData,refreshToken,setSignal} from '../store/dataSlice.js';
import { useNavigate } from 'react-router-dom';  //for redirecting to another page
import { useSelector,useDispatch } from 'react-redux';

function ShippingAddress() {

    const numbers = Array.from({ length: 10 }, (_, i) => i + 1); //creating new array here:-
    const [dataBagData,setDataBagData]=useState([])
    const [cardColor,setColor]=useState("bg-green-50");
    const [dataDeleted,setDataDeleted]=useState();
    const [total,setTotal]=useState(0);
    const navigate = useNavigate();
    const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
    const bagData = useSelector((state) => state.bag.data);
    const loading = useSelector((state) => state.bag.loading);
    const error = useSelector((state) => state.bag.error);
   
    
    // const userId = useSelector(state=>state.username.userId);
    const dispatch=useDispatch();
    console.log("three states coming>>>>>>>>>",bagData,loading,error);


            useEffect(()=>{
    
             const fetchBagItemsFunction=async()=>{
    
    
                  const ID = await fetchID(token);
                  dispatch(fetchBagData(ID));
    
    
    
              }
    
     fetchBagItemsFunction();
    
    
    
            },[token])
    // const dataBagParse=localStorage.getItem("bagItem")

    // const dataBagStored=JSON.parse(dataBagParse);

    console.log("this is loading status in bagItem fatch",loading);

    useEffect(() => {

        const fetchTotalPrice = async () => {
          // Safely get data from localStorage
          // setDataBagData(storedData);

          try {
            const userId = await fetchID(token);
            console.log("User ID:", userId);
      
            const response = await axios.post("https://khareedle-ecommerce.onrender.com/users/totalprice", {
              userId
            });
      
            console.log("Total Price:", response.data.Price);
            setTotal(response.data.Price);
          } catch (error) {
            console.error("Error fetching total price:", error);
          }
        };
      
        fetchTotalPrice();
      }, [bagData]);
      


      console.log("bagData",dataBagData)

      const HandleConfirm=async ()=>{

            
          navigate("/users/address")



        

      }

      async function  deleteQuantity(productId)
      {
        
        const ID=await fetchID(token);

        const IDS={userId:ID , productId:productId};

        console.log("this is ids",IDS);
        // const userId=localStorage.getItem("userID");
        const dataDeleted= await axios.post("https://khareedle-ecommerce.onrender.com/users/deletequantity",{ userId: ID,
          
        productId: productId})

        console.log("this is data deleted",dataDeleted);
      

        dispatch(fetchBagData(ID)); 

    
      }
  
      console.log("this is the bagData length",bagData.bagItems?.length);

  return (

<>

<Header></Header>

    <div className="bagContainer  relative top-36">

        <div className='bagChildContainer'>

<div className='textBagContainer flex justify-center pt-4 '>
            <h1 className='text-5xl HeadingPlayFair'>My Bag</h1>

            <img className='carryBag ml-3 w-9 ' src={bag}></img>
            </div>
<div className='BagDetailsContainer  pt-3 border-b-2 border-gray-400 pb-4'> 
    <div className='itemsNumberContainer flex justify-start pl-12'>

        <h1 className='text-xl'>Total Items</h1>
        <h1 className='text-xl'>(5)</h1>
        
    </div>

</div>

<div className='middleDataContainer  flex   justify-evenly' >

<div className="leftSideProducts w-4/6  pl-4">

    {
      
    !bagData || bagData.length === 0 ? (<div>YOUR CART IS EMPTY BROOOO......</div>):(
        bagData.bagItems?.map((item,index)=>(

                <div className={`productCard  flex items-center ${cardColor} justify-around  mt-4  rounded`} key={`${index}`}>

                <div className='imageCard h-24 w-24 '>

                    <img src={item.productImage}></img>
                    
                </div>
        
                <div className='productCardDetail'>
        
                    <h1 className='text-sm'>{item.productName}</h1>
        
                </div>
        
                <div className='quantityContainer'>
        
            <span className="bg-green-500 pr-2 pl-2 text-base rounded">-</span><span className='text-sm'>Qty</span>
                   
            <select className="border border-gray-300 rounded text-sm">
              {/* {numbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))} */}

              <option>{item.quantity}</option>
            </select>
            <span className="bg-red-500 pr-2 pl-2 text-base rounded">+</span>
                    
        
                </div>
        
                <div className='deleteCardButton flex items-center' onClick={() => deleteQuantity(item.productId)}>
        
                    {/* <h1 className='text-sm font-normal'>Delete</h1> */}

                    <img src={DeleteIcon} className='h-4'></img>
        
                </div>
        
                <div className='priceCardContainer'>
        
                    <div className='originalPrice'>
        
                        <p className="flex text-sm">Original Price <span className="line-through font-bold pl-1 text-sm">₹80,000</span> </p>
        
                    </div>
        
                    <div className='discountedPrice'>
        
                <p className="flex text-sm">Discounted Price <span className=" font-bold pl-1 text-sm"> ₹{item.price} </span></p>
        
                    </div>
        
                </div>
        
            </div>

        )
      )

        )

    }
</div>

{/* left data below */ }

<div className='orderFinalDetailsContainer  flex justify-center mt-4  w-1/4 h-80'>

<div className='orderFinalDetailsContainerChild flex w-full flex-col bg-gray-100 p-4 rounded-lg '>


    <div className='bagDetails border-gray-300 border-b-2 pb-2 border-dotted'>

        <div className='bagTotal  flex justify-between '>

            <p  className='text-sm'>Bag Total</p>
            <p className='font-semibold text-sm'>₹{total}</p>

        </div>

        <div className='extra  flex justify-between '>

            <p  className='text-sm'>Included</p>
            <p className='font-semibold text-sm'><span className='text-green-500 font-bold'>FREE:</span>Cover&Cases</p>

        </div>

    </div>

  <div className='devliveryContainer flex justify-between'>

  <p  className='text-sm'>Delivery Charges</p>
  <p className='font-semibold text-sm'><span className='text-green-500 font-bold'>FREE:</span>₹0</p>


  </div>

  <div className='devliveryContainer flex justify-between'>

<p className='text-sm'>Platform Fee</p>
<p className='font-semibold text-sm'>₹50.00</p>


</div>


<div className='orderTotal flex justify-between pt-1'>

<p className='font-bold text-lg'>Order Total</p>
<p className='font-semibold text-lg'>₹{total+50}.00</p>


</div>

<div className="confirmButtonContainer  flex justify-center mt-10">

    <button className="confirmButton bg-purple-500 text-white rounded hover:bg-green-400 w-44 h-10" onClick={HandleConfirm}>Confirm</button>

</div>


    </div>

</div>
</div>

{ /* AHMED */ }
        </div> 
        
    </div>
    </>
  )
}

export default ShippingAddress;