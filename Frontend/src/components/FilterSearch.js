import React,{useState} from 'react'
import { Slider, Typography } from "@mui/material";

function FilterSearch() {


  const [priceRange, setPriceRange] = useState([0, 50000]); // default range

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
    // onChange(newValue); // send to parent
  };




  return (
    
    <div>

    <div className="searchByNameItem">

    <input name="Search By Name"  placeholder="Search by Name"  />

    </div>

    <div style={{ padding: "20px" }} className="w-1/5 bg-gray-100">

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


    </div>
  )
}

export default FilterSearch