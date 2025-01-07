import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching data from an API
export const fetchData = createAsyncThunk('data/fetchData', async (payload) => {
  console.log(payload)
  const response = await axios.post("http://localhost:1000/users/postdetails",{payload},{

    headers: {
      'Content-Type': 'application/json', // Set content type to JSON
    },

  }); 

  console.log(response.data)
  // Replace with your API URL
  return response.data; // Assumes the response data is an array of objects
});

//purchasing page data store:
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the array of objects from the API
        localStorage.setItem('apiData', JSON.stringify(action.payload));
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



 export const statusCode=createSlice({


  name:"status",
  initialState:{

    status:null,

  },

  reducers:{
    setStatusCode:(state,action)=>{


      state.status=action.payload;


    },
},
})

//store username
export const setUser=createSlice({


  name:"username",
  initialState:{

    username:'',
    userId:'',

  },

  reducers:{
    setUsername:(state,action)=>{

      state.username=action.payload;

    },

    setUserId:(state,action)=>{

      state.userId=action.payload;

    },
},
})

//store similiar products in store:
export const similiarProduct=createSlice({

name:"similiarproductstore",

initialState:{

  dataSimiliar:[],

},

reducers:{

setSimiliarProduct:(state,action)=>{

state.dataSimiliar=action.payload;


}

  
}

})




export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // initial state for storing array data
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload; // setting the array data to the state
    },

  },
});

//Cart Number increment and decrement
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state,action) => {
      state.value = action.payload;
    },
  
  }
});


export default dataSlice.reducer;
export const {setStatusCode}=statusCode.actions;
export const {setUsername,setUserId}=setUser.actions;
export const {setSimiliarProduct}=similiarProduct.actions;
export const { setProducts} = productSlice.actions;
export const {increment}=counterSlice.actions



