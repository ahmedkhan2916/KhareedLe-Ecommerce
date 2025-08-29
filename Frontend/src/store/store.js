import { configureStore } from '@reduxjs/toolkit';
import dataReducer, { fetchBagData, fetchBagTotal2, quantityItemBagStore } from './dataSlice.js';
import {
  statusCode,
  setUser,
  similiarProduct,
  productSlice,
  counterSlice,
  AccessToken,
  productSlideReducer,
  bagSlice,
  authLogin,
  productSliceReducer,
  reviewSliceReducer,
  access_Tok,
  SignalBoolean,
  fetchIDStoreReducer,
  fetchCartQty,
  fetchBagDataStore,
  changeButtonTextStore,
  filteredData,


} from './dataSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    status: statusCode.reducer,
    username: setUser.reducer,
    similiarproductstore: similiarProduct.reducer,
    products: productSlice.reducer,
    counter: counterSlice.reducer,
    AccessTK: AccessToken.reducer,
    slideproducts: productSlideReducer,
    bag: bagSlice.reducer,
    auth: authLogin,
    product:productSliceReducer,
    review: reviewSliceReducer,
    userAuth:access_Tok,
    signal: SignalBoolean.reducer,
    fetchID:fetchIDStoreReducer,
    fetchProductQty: fetchCartQty,
    fetchBagTotalStore: fetchBagDataStore,
    quantityItemBag:quantityItemBagStore,
    changeButtonText:changeButtonTextStore,
    filteredData:filteredData.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
