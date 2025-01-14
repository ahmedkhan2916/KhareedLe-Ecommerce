import React, { useEffect, useState } from 'react'
import "../assets/Style/Headings.css"
import Header from "../components/HeaderChange.js"
import Map from './Map.js'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Address() {

    const navigate = useNavigate();

    const [radio,setRadio]=useState({firstRadio:false,secondRadio:false});
    const userId=localStorage.getItem("userID");
    const [address,setAddress]=useState(localStorage.getItem("UserAddress" || ""));


    useEffect(()=>{
     
        const updatedAddressFunction= ()=>{
     const  ComingAddress=localStorage.getItem("UserAddress");
     if(ComingAddress!==address)
     {

        setAddress(ComingAddress || "");
        console.log("this is coming address baby",address);


     }

    //

        }

        console.log("this is coming address baby",address);

        window.addEventListener("storage",updatedAddressFunction);

        return ()=>{
            window.removeEventListener("storage",updatedAddressFunction);
        }
    
    },[address]);
   

   
    

    const [formData,setFormData]=useState({

        userId:'',
        name:'',
        type:'',
        street:'',
        phone:'',
        city:'',
        state:'',
        pincode:'',
        landmark:'',
        locality:'',
        alternate:'',



    });


    const handleChange=(e)=>{


            setFormData({...formData,[e.target.name]:e.target.value});


    }


    const handleAddressForm=async(e)=>{

        e.preventDefault();

        const dataSent= await axios.post("http://localhost:1000/users/addressadd",{...formData,userId});

        console.log("this is data",dataSent);

        navigate("/users/ferris");
        

    }



    // const handleRadio= (target)=>{

    //     if(target==="first")
    //     {

    //         setRadio({
    //             firstRadio:true,
    //             secondRadio:false,
    //         });

    //     }

    //     if(target==="second")
    //         {
    
    //             setRadio({
    //                 firstRadio:false,
    //                 secondRadio:true,
    //             });
    
    //         }





    // }

  return (

    <>

<Header></Header>

    <div className='addressContainer bg-red-400 w-screen h-screen '>

        <div className='addressChildContainer w-full h-full bg-white flex justify-center items-center'>

            {/* <div className='titleAddress pr-24 HeadingLato'>

                <h1 className='text-6xl'>Add Address</h1>

            </div> */}
            <Map></Map>

<div className='AddressFormContainer ml-5 w-2/5 h-3/4  bg-green-100 flex flex-col justify-center rounded-xl mt-32 items-center' >

   <form className='formAddress ml-20 ' onSubmit={handleAddressForm} >

            <input placeholder='Name' className='h-10 rounded' name="name" onChange={handleChange}></input>
            <input placeholder='Phone Number' className='h-10 rounded ml-1' name="phone" onChange={handleChange}></input>

            <input placeholder='Pincode' className='h-10 mt-3 rounded' name="pincode" onChange={handleChange}></input>
            <input placeholder='Locality' className='h-10 rounded ml-1' name="locality" onChange={handleChange}></input>

            <input placeholder='Street' className='h-10 mt-3 rounded' name="street" onChange={handleChange}></input>
            <input placeholder='City/District/Town' className='h-10 rounded ml-1' name="city" onChange={handleChange}></input>

            <input placeholder='State' className='h-10 mt-3 rounded' name="state" onChange={handleChange}></input>
            <input placeholder='Landmark' className='h-10 rounded ml-1' name="landmark" onChange={handleChange}></input>
        
            <input placeholder='Alternate Phone' className='h-10 mt-3 rounded' name="alternate" onChange={handleChange}></input>
    
            <input  type="radio"
  checked={formData.type === "billing"}
  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
  className="ml-4"
  name="type"
  value="billing"></input>
            <label className="text-sm">billing</label>

            <input  type="radio"
  checked={formData.type === "shipping"}
  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
  className="ml-4"
  name="type"
  value="shipping"></input>
            <label className="text-sm">Shipping</label>
           

<div className='buttonContainerSubmit'>
            <button className='submitBtn h-9 w-24 rounded bg-purple-500  text-white mt-6' type="submit"  >Submit</button>

            </div>

   </form>



   {/* <div className='AddressTypeContainer ml-20 mt-3'>



    <div className='homeAddressContainer'>
        <input type="radio" checked={radio.firstRadio} onChange={()=>handleRadio('first')}></input>
        <label className="text-sm">Home</label>

    </div>

    <div className='workingAddressContainer pt-1'>
        <input type="radio" checked={radio.secondRadio} onChange={()=>handleRadio('second')}></input>
        <label className="text-sm">Work/Office</label>

    </div>

   </div> */}

   {/* <div className='buttonSubmitAddress ml-20 mt-7'>

    

   </div> */}
</div>
</div>








    </div>

    </>
  )
}

export default Address;