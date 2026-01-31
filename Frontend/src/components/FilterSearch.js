import React,{useState} from 'react'
import { Slider, Typography } from "@mui/material";
import axios from "axios"
import { filteredDataFromFilterComp } from '../store/dataSlice';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

function FilterSearch() {


  const [priceRange, setPriceRange] = useState([0, 50000]); // default range
  const [Item_Name,setName]=useState("");

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
    // onChange(newValue); // send to parent
        const Range_min=priceRange[0];
    const Range_max=priceRange[1];

    console.log(Range_min,Range_max)
   
  };

  const handleSendFilterQuery=async(req,res)=>{

    const Range_min=priceRange[0];
    const Range_max=priceRange[1];



    try{


    //     const response = await axios.get("http://localhost:1000/users/filter", {
    //   params: {
    //     Item_Name,
    //     Range_min,
    //     Range_max,
    //   },
    // });
const params={Item_Name,Range_min,Range_max};

dispatch(filteredDataFromFilterComp(params));
navigate("/users/filteredSearch")

// console.log("here is the params filtered  dataaaa>>>",response);


    }
    catch(err)
    {
      console.log("error to fetch dataaaa filtered",err);
    }

  }

  console.log(Item_Name)



  return (
    
    <div className='FilterSearchComponentContainer w-1/4 '>

    <div className="searchByNameItem">
    
    <input className='h-10 w-10/12' name="Search By Name"  placeholder="Search by Name"  value={Item_Name}  onChange={(e)=>setName(e.target.value)}/>

    </div>

    <div style={{ padding: "20px" }} className="w-full bg-gray-100">

      <Typography variant="h6">Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={100000}
        step={1000}
      />
      <Typography>
        ₹{priceRange[0]} - ₹{priceRange[1]}
      </Typography>
    </div>

<button className='bg-green-400 h-10 w-10/12 rounded-xl hover:bg-purple-300' onClick={handleSendFilterQuery}>Search</button>

    </div>
  )
}

export default FilterSearch