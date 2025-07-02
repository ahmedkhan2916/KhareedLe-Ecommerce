import React, { useEffect, useState } from 'react'
import "../assets/Style/Headings.css"
import Header from "../components/HeaderChange.js"
import Map from './Map.js'
import axios from "axios"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {fetchID} from "../Services/apiService.js"

function Address() {

    const navigate = useNavigate();


    const [radio,setRadio]=useState({firstRadio:false,secondRadio:false});
    // const userId = useSelector(state=>state.username.userId);
    const [address,setAddress]=useState(localStorage.getItem("UserAddress" || ""));
    const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
     const product = useSelector(state => state.product.product);

//     const [userId,setUserId]=useState();

//     useEffect(()=>{



// setUserId(fetchID(localStorage.getItem("accessToken")));





//     },[])

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
        latitude:'',
        longitude:'',


    });


    const handleChange=(e)=>{


            setFormData({...formData,[e.target.name]:e.target.value});


    }


    const handleAddressForm=async(e)=>{

        e.preventDefault();

        const userId=await fetchID(token);
        
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
            <Map   onLocationSelect={(addressData) => {
    setFormData((prev) => ({
      ...prev,
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.pincode,
      locality:addressData.locality,
      latitude: addressData.latitude,
      longitude: addressData.longitude,
    }));
  }}></Map>

<div className='AddressFormContainer ml-5 w-2/5 h-3/4  bg-green-100 flex flex-col justify-center rounded-xl mt-32 items-center' >

   <form className='formAddress ml-20 ' onSubmit={handleAddressForm} >

            <input placeholder='Name' className='h-10 rounded' name="name" onChange={handleChange} ></input>
            <input placeholder='Phone Number' className='h-10 rounded ml-1' name="phone" onChange={handleChange} ></input>

            <input placeholder='Pincode' className='h-10 mt-3 rounded' name="pincode" onChange={handleChange} value={formData.pincode}></input>
            <input placeholder='Locality' className='h-10 rounded ml-1' name="locality" onChange={handleChange} value={formData.locality}></input>

            <input placeholder='Street' className='h-10 mt-3 rounded' name="street" onChange={handleChange} value={formData.street}></input>
            <input placeholder='City/District/Town' className='h-10 rounded ml-1' name="city" onChange={handleChange} value={formData.city}></input>

            <input placeholder='State' className='h-10 mt-3 rounded' name="state" onChange={handleChange} value={formData.state}></input>
            <input placeholder='Landmark' className='h-10 rounded ml-1' name="landmark" onChange={handleChange} ></input>
        
            <input placeholder='Alternate Phone' className='h-10 mt-3 rounded' name="alternate" onChange={handleChange} ></input>
    
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









// Address.js
// import React, { useEffect, useState } from 'react';
// import "../assets/Style/Headings.css";
// import Header from "../components/HeaderChange.js";
// import Map from './Map.js';
// import axios from "axios";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchID } from "../Services/apiService.js";

// function Address() {
//   const navigate = useNavigate();
//   const [address, setAddress] = useState(localStorage.getItem("UserAddress") || "");
//   const { token } = useSelector((state) => state.userAuth);

//   const [formData, setFormData] = useState({
//     userId: '', name: '', type: '', street: '', phone: '', city: '',
//     state: '', pincode: '', landmark: '', locality: '', alternate: '',
//     latitude: '', longitude: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddressForm = async (e) => {
//     e.preventDefault();
//     const userId = await fetchID(token);
//     const dataSent = await axios.post("http://localhost:1000/users/addressadd", { ...formData, userId });
//     console.log("this is data", dataSent);
//     navigate("/users/ferris");
//   };

//   useEffect(() => {
//     const updatedAddressFunction = () => {
//       const ComingAddress = localStorage.getItem("UserAddress");
//       if (ComingAddress !== address) {
//         setAddress(ComingAddress || "");
//       }
//     };
//     window.addEventListener("storage", updatedAddressFunction);
//     return () => window.removeEventListener("storage", updatedAddressFunction);
//   }, [address]);

//   return (
//     <>
//       <Header />
//       <div className='w-full min-h-screen bg-red-400 flex flex-col lg:flex-row p-4 lg:p-8 gap-6'>

//         <div className="w-full lg:w-1/2 flex justify-center items-start">
//           <Map onLocationSelect={(addressData) => {
//             setFormData(prev => ({
//               ...prev,
//               street: addressData.street,
//               city: addressData.city,
//               state: addressData.state,
//               pincode: addressData.pincode,
//               locality: addressData.locality,
//               latitude: addressData.latitude,
//               longitude: addressData.longitude,
//             }));
//           }} />
//         </div>

//         <div className='w-full lg:w-full bg-green-100 rounded-xl p-4 flex justify-center items-start'>
//           <form className='w-full max-w-md' onSubmit={handleAddressForm}>
//             <div className="flex flex-wrap gap-2">
//               <input placeholder='Name' className='h-10 rounded p-2 w-full sm:w-[48%]' name="name" onChange={handleChange} />
//               <input placeholder='Phone Number' className='h-10 rounded p-2 w-full sm:w-[48%]' name="phone" onChange={handleChange} />

//               <input placeholder='Pincode' className='h-10 mt-2 rounded p-2 w-full sm:w-[48%]' name="pincode" onChange={handleChange} value={formData.pincode} />
//               <input placeholder='Locality' className='h-10 mt-2 rounded p-2 w-full sm:w-[48%]' name="locality" onChange={handleChange} value={formData.locality} />

//               <input placeholder='Street' className='h-10 mt-2 rounded p-2 w-full sm:w-[48%]' name="street" onChange={handleChange} value={formData.street} />
//               <input placeholder='City/District/Town' className='h-10 mt-2 rounded p-2 w-full sm:w-[48%]' name="city" onChange={handleChange} value={formData.city} />

//               <input placeholder='State' className='h-10 mt-2 rounded p-2 w-full sm:w-[48%]' name="state" onChange={handleChange} value={formData.state} />
//               <input placeholder='Landmark' className='h-10 mt-2 rounded p-2 w-full sm:w-[48%]' name="landmark" onChange={handleChange} />

//               <input placeholder='Alternate Phone' className='h-10 mt-2 rounded p-2 w-full' name="alternate" onChange={handleChange} />
//             </div>

//             <div className='mt-4 flex items-center gap-4 flex-wrap'>
//               <label className="flex items-center gap-1">
//                 <input type="radio" checked={formData.type === "billing"} onChange={(e) => setFormData({ ...formData, type: e.target.value })} name="type" value="billing" />
//                 <span className="text-sm">Billing</span>
//               </label>
//               <label className="flex items-center gap-1">
//                 <input type="radio" checked={formData.type === "shipping"} onChange={(e) => setFormData({ ...formData, type: e.target.value })} name="type" value="shipping" />
//                 <span className="text-sm">Shipping</span>
//               </label>
//             </div>

//             <div className='mt-6'>
//               <button className='h-10 w-full rounded bg-purple-500 text-white font-semibold' type="submit">Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Address;
