import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from "../config/config.js";
// import { User } from '../../../Backend/src/models/user.signup';

// Async thunk for fetching data from an API
export const fetchData = createAsyncThunk('data/fetchData', async (payload) => {
  console.log(payload)
  const response = await axios.post(`${BASE_URL}/users/postdetails`,{payload} , {

    headers: {
      'Content-Type': 'application/json',// Set content type to JSON
  },
  
  withCredentials: true,

  }); 

  console.log("dataSlice data>>>>>>>>>",response.data)
  // Replace with your API URL
 return response.data ;
});



export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/getData`);
      return response.data;
    } catch (error) {

      return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');

    }
  }
);

export const fetchBagData = createAsyncThunk('bag/fetchBagData', async (ID, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/fetchbag`, { UID:ID});
    return response.data; // Return the fetched bag data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch bag data');
  }
});


//its fetching username userId refreshToken $ AccessToken from DB 
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (bodyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, bodyData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // for cookies
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchReviewData = createAsyncThunk(
  'review/fetchReviewData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/fetchuser`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/refresh-token-handler-access-token`,
      {}, // No body needed
       {
        withCredentials: true, // ✅✅✅ IMPORTANT!!!
      }// Send cookies
    );
    return response.data.accessToken;
  } catch (error) {
    return thunkAPI.rejectWithValue('Token refresh failed');
  }
});


export const fetchUserID=createAsyncThunk("auth/fetchUserID",async (accessToken,thunkAPI)=>{

  try {
    if(!accessToken)
    {
      return;
    }
    const response = await axios.get(`${BASE_URL}/users/userid-fetch`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true
    });
    return response.data.ID; // Return user ID
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch user ID');
  }
});


export const fetchProductQuantity = createAsyncThunk(
  'quantityItemBag/fetchProductQuantity',
  async ({UserID,productId,value}, thunkAPI) => {
    try {
      console.log("i am in store",UserID,productId,value);
      const response = await axios.post(`${BASE_URL}/users/inc-dec-items`, {UserID,productId,Signal:value});
      return response.data.Data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.Data || 'Something went wrong');
    }
  }
);


export const fetchBagTotal2 = createAsyncThunk(
  'quantityItemBag/fetchProductQuantity',
  async ({ID}, thunkAPI) => {
    try {
      // console.log("i am in store",UserID,productId,value);
      const response = await axios.post(`${BASE_URL}/users/showtotal`, {userId:ID});
      console.log("here is responsive data",response);
      return response.data.totalQuantity;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.totalQuantity || 'Something went wrong');
    }
  }
);


export const fetchAddToBag = createAsyncThunk(
  'quantityItemBag/fetchProductQuantity',
  async (Ids, thunkAPI) => {
    try {
      // console.log("i am in store",UserID,productId,value);
      const response = await axios.post(`${BASE_URL}/users/addbag`, Ids);
      console.log("here is responsive data",response);
      return response.status; //here is responsive data coming create a redux store for it:----
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response || 'Something went wrong');
    }
  }
);

export const changeButtonText= createAsyncThunk('quantityItemBag/changeButtonText', async (Ids, thunkAPI) => {    

  try{


    
    const response = await axios.post(`${BASE_URL}/users/changetext`, Ids);
    console.log("here is responsive data",response);
    return response.status; // Return the updated text


  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.status || 'Something went wrong');
  }
  });


  export const changeButtonSlice = createSlice({
  name: 'changeButtonText',
  initialState: {
    buttonText: null,
    statusButtonText: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    errorButtonText: null,
  },
  reducers: {
    resetButtonText: (state) => {
      state.buttonText = null;
      state.statusButtonText = 'idle';
      state.errorButtonText = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeButtonText.pending, (state) => {
        state.statusButtonText = 'loading';
        state.errorButtonText = null;
      })
      .addCase(changeButtonText.fulfilled, (state, action) => {
        state.statusButtonText = 'succeeded';
        state.buttonText = action.payload;
      })
      .addCase(changeButtonText.rejected, (state, action) => {
        state.statusButtonText = 'failed';
        state.errorButtonText = action.payload;
      });
  },
});




export const quantityItemBagSlice = createSlice({
  name: 'quantityItemBag',
  initialState: {
    bagItem: null,
    statusItem: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    errorItem: null,
  },
  reducers: {
    clearBag: (state) => {
      state.bagItem = null;
      state.statusItem = 'idle';
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddToBag.pending, (state) => {
        state.statusItem = 'loading';
        state.errorItem = null;
      })
      .addCase(fetchAddToBag.fulfilled, (state, action) => {
        state.statusItem = 'succeeded';
        state.bagItem = action.payload.data; // assuming response.data has your bag info
      })
      .addCase(fetchAddToBag.rejected, (state, action) => {
        state.statusItem = 'failed';
        state.errorItem = action.payload;
      });
  },
});


export const fetchBagTotalReduxStore = createSlice({

  
  name: 'fetchBagTotalStore',

  initialState: {

    totalBag: 0,
    statusTotalBag: 'idle',
    errorBagTotal: null,

  },

  reducers: {


    setTotalBagNull:(state)=>
      
      {
    
        state.totalBag=0; // Reset totalBag to 0
        state.statusTotalBag = 'idle'; // Reset status to idle

      }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBagTotal2.pending, (state) => {
        state.statusTotalBag = 'loading';     // ✅ correct key
      })
      .addCase(fetchBagTotal2.fulfilled, (state, action) => {
        state.statusTotalBag = 'succeeded';   // ✅ correct key
        state.totalBag = action.payload;      // ✅ correct key
      })
      .addCase(fetchBagTotal2.rejected, (state, action) => {
        state.statusTotalBag = 'failed';      // ✅ correct key
        state.errorBagTotal = action.payload; // ✅ correct key
        state.totalBag = 0;                   // ✅ correct key
      });
  }
});



export const fetchCartProductQty=createSlice({

name:"fetchProductQty",

initialState:{

  qty:0,
  qtyStatus:'idle',
  qtyError:null,

},

reducers:{},

extraReducers:(builder)=>
{
 builder
      .addCase(fetchProductQuantity.pending, (state) => {
        state.qtyStatus = 'loading';
      })
      .addCase(fetchProductQuantity.fulfilled, (state, action) => {
        state.qtyStatus = 'succeeded';
        state.qty = action.payload;
      })
      .addCase(fetchProductQuantity.rejected, (state, action) => {
        state.qtyStatus = 'failed';
        state.qtyError = action.payload;
        state.qty = null;
      });



}


})


export const fetchIDStore=createSlice({

  name: 'fetchID',

  initialState:{

    UserID:null,
    StatusID:'idle',
    ErrorID:null,

  },

  reducers: {

    userIDNULL:(state)=>{

      state.UserID=null;

    }


  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserID.pending, (state) => {
        state.StatusID = 'loading';
      })
      .addCase(fetchUserID.fulfilled, (state, action) => {
        state.StatusID = 'succeeded';
        state.UserID = action.payload;
      })
      .addCase(fetchUserID.rejected, (state, action) => {
        state.StatusID = 'failed';
        state.ErrorID = action.payload;
        state.UserID = null;
      });
  }

})


export const access_Tok_Store=createSlice({

  name:"userAuth",
  initialState:{

    token:null,
    status:'idle',
    errorAccess:null,
  },

  reducers:{

    logoutAccessTK:(state)=>{

      state.token=null;


    }
  },


  extraReducers:(building)=>{

    building.addCase(refreshToken.pending, (state) => {
      state.status = 'loading';
    })  .addCase(refreshToken.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload;
    }) .addCase(refreshToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.token = null;
    });





  }







})

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviewData: [],
    loadingReview: false,
    errorReview: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewData.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(fetchReviewData.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.reviewData = action.payload;
      })
      .addCase(fetchReviewData.rejected, (state, action) => {
        state.loadingReview= false;
        state.errorReview = action.payload;
      });
  },
});




export const productSlice2 = createSlice({
  name: 'product',
  initialState:{  
    
    product: {
    image: '',
    name: '',
    details: '',
    description: '',
    price: '',
    rating: '',
    id: '',
    productColor:[{}],
  }},
  reducers: {
    setProductData: (state, action) => {
      state.product = {
        image: action.payload.image,
        name: action.payload.name,
        details: action.payload.details,
        description: action.payload.description,
        price: action.payload.price,
        rating: action.payload.rating,
        id: action.payload.id
      };
    }
  }
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
        state.data =action.payload; // Set the array of objects from the API
        localStorage.setItem('apiData', JSON.stringify(action.payload));

      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



const productSlide = createSlice({
  name: 'slideproducts',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const bagSlice = createSlice({
  name: 'bag',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {


    setBagData: (state, action) => {
      state.data = action.payload;
    },
      clearBagSlice: (state) => {
      state.data = []; // <-- Clear bag on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBagData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBagData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBagData.rejected, (state, action) => {
        state.loading = null;
        state.error = action.payload;
      });
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users:null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.users = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
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



export const AccessToken=createSlice({


  name:"AccessTK",
  initialState:{

    Token:"",

  },

  reducers:{

    setAccessTK:(state,action)=>{


      state.Token=action.payload;


    },
},
});



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


export const SignalBoolean = createSlice({
  name: 'signal',
  initialState: {
    signal: false
  },
  reducers: {
    setSignal: (state, action) => {
      state.signal = action.payload;
    }
  }
});



export default dataSlice.reducer;
export const {setStatusCode}=statusCode.actions;
export const {setUsername,setUserId}=setUser.actions;
export const {setSimiliarProduct}=similiarProduct.actions;
export const { setProducts} = productSlice.actions;
export const {increment}=counterSlice.actions
export const {setAccessTK}=AccessToken.actions;
export const productSlideReducer = productSlide.reducer;
export const authLogin = authSlice.reducer;
export const { setProductData } = productSlice2.actions;
export const productSliceReducer=productSlice2.reducer;
export const reviewSliceReducer=reviewSlice.reducer;
export const access_Tok = access_Tok_Store.reducer;
export const { setSignal } = SignalBoolean.actions;
export const {setBagData} = bagSlice.actions;
export const {clearBagSlice} = bagSlice.actions;
export const fetchIDStoreReducer=fetchIDStore.reducer;
export const fetchCartQty=fetchCartProductQty.reducer;
export const {logout}=authSlice.actions;
export const fetchBagDataStore= fetchBagTotalReduxStore.reducer;
export const { setTotalBagNull } = fetchBagTotalReduxStore.actions;
export const { userIDNULL} =  fetchIDStore.actions;
export const { clearBag } = quantityItemBagSlice.actions;
export const quantityItemBagStore=quantityItemBagSlice.reducer;
export const { resetButtonText } = changeButtonSlice.actions;
export const changeButtonTextStore = changeButtonSlice.reducer;
export const {logoutAccessTK}=access_Tok_Store.actions;//refreshToken dipatch logout function
