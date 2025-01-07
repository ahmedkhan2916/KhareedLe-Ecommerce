import React from 'react'
import DeleteIcon from "../assets/Brandlogo/trash.png"
import { useState ,useEffect} from 'react';
import "../assets/Style/shipping.css"
import bag from "../assets/images/shoppingbag3.png";
import Header from '../components/HeaderChange';
import axios from "axios";
import "../assets/Style/Headings.css"
import { redirect } from 'react-router-dom';

function ShippingAddress() {

    const numbers = Array.from({ length: 10 }, (_, i) => i + 1); //creating new array here:-
    const [dataBagData,setDataBagData]=useState([])
    const [cardColor,setColor]=useState("bg-green-50");
    const [dataDeleted,setDataDeleted]=useState();
    const [total,setTotal]=useState(0);
    


    // const dataBagParse=localStorage.getItem("bagItem")

    // const dataBagStored=JSON.parse(dataBagParse);

    // console.log(dataBagData)

    useEffect(() => {
        const fetchTotalPrice = async () => {
            const storedData = JSON.parse(localStorage.getItem("bagItem")) || [];
            setDataBagData(storedData);
      
            const userId = localStorage.getItem("userID");
            console.log(userId);
      
            try {
              const response = await axios.post("http://localhost:1000/users/totalprice", { userId });
              console.log("here the total price",response.data.Price)
              setTotal(response.data.Price); // Assuming `total` is the key in the response
            } catch (error) {
                // console.log("here userId",userId)
              console.error("Error fetching total price:", error);
            }
          };
      
          fetchTotalPrice();

        
      }, []);

      console.log("bagData",dataBagData)

      async function  deleteQuantity(productId)
      {
        
        const IDS={userId:localStorage.getItem("userID"), productId:productId};
        console.log("this is ids",IDS);
        // const userId=localStorage.getItem("userID");
        const dataDeleted= await axios.post("http://localhost:1000/users/deletequantity",{ userId: localStorage.getItem("userID"),
            productId: productId})

        console.log("this is data deleted",dataDeleted);
         
        // setDataBagData((prevData) =>
        //     prevData.map((item) =>
        //         item.productId === productId
        //             ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        //             : item
        //     ).filter(item => item.quantity > 0) // Remove items with 0 quantity
        // );

      }
  
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
        dataBagData.map((item,index)=>(

            

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