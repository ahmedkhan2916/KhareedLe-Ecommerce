import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage for web
import dataReducer from './dataSlice.js';
import {
  statusCode,
  setUser,
  similiarProduct,
  productSlice,
  counterSlice,
  AccessToken,
} from './dataSlice';

// Configure persistence for specific slices
const persistConfig = {
  key: 'root', // Root key for the persisted store
  storage,     // Storage engine
  whitelist: ['username','userId'], // Persist the username slice (includes userId)
};

const dataPersistConfig={

  key:'dataApi',
  storage,
  whitelist:['apiData']



}

// Persisted reducers
const persistedSetUserReducer = persistReducer(persistConfig, setUser.reducer);
const persistDataReducer=persistReducer(dataPersistConfig,dataReducer);

const store = configureStore({
  reducer: {
    data: persistDataReducer,
    status: statusCode.reducer,
    username: persistedSetUserReducer, // Persisted Username Slice (Includes userId)
    similiarproductstore: similiarProduct.reducer,
    products: productSlice.reducer,
    counter: counterSlice.reducer,
    AccessTK:AccessToken.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // CreatePersistor
export default store;
