import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice.js';
import { statusCode,setUser,similiarProduct,productSlice,counterSlice} from './dataSlice.js';


const store = configureStore({
  reducer: {
    data: dataReducer,
    status:statusCode.reducer,
    username:setUser.reducer,
    similiarproductstore:similiarProduct.reducer,
    products:productSlice.reducer,
    counter:counterSlice.reducer,
    userId:setUser.reducer,
   
  },
});

export default store;