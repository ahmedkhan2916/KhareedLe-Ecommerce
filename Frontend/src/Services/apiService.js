import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

// Function to fetch user details
export const fetchID = async (accessToken) => {

  try {

    if(!localStorage.getItem("accessToken"))
    {
      return;
    }

    const IDS=await axios.get("http://localhost:1000/users/userid-fetch", {

      headers: {

        Authorization: `Bearer ${accessToken}`,

      }, withCredentials: true});

      console.log("here is my iDDDDDDDDDDDDSSSSSS FetchId Compo",IDS)

    return IDS.data.ID; // Return user data
  } 
  catch (error) {

  console.error("Error fetching user details:", error);
  throw error// Rethrow error for handling in the calling component

  }
};

export const showTotalFuncHeader=async(ID)=>{

  try{


    if(!localStorage.getItem("accessToken"))
      {
        return;
      }

    let totalCart=await axios.post("http://localhost:1000/users/showtotal",{userId:ID});
    return totalCart.data.totalQuantity

  }
  catch(error)
  {
    console.error("Error fetching user details:", error);
    throw error; // Rethrow error for handling in the calling component

  }

}


export const fetchSearchItems=async(inputValue)=>{

try{

 
  const searchedQuery=await axios.get(`http://localhost:1000/users/userSearch?name=${inputValue}`);

  return searchedQuery;

}
catch(error)
{
  console.error("Error fetching user details:", error);
  throw error; // Rethrow error for handling in the calling component

}

}


// export const accessTokenRefresh=async(encryptId)=>{


// //  const userId=useSelector((state)=>state.username);

//   console.log("this is encrypteddddddd",encryptId);







// }

