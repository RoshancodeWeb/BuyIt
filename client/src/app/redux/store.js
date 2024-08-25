import { configureStore,getDefaultMiddleware }  from "@reduxjs/toolkit";
import productReducer from './slice.js'  
import userReducer from './userSlice.js'
import storage from "redux-persist/lib/storage"
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig={
  key:"root",
  storage
}

const rootReducer=combineReducers({
  products:productReducer,
  user:userReducer
})

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Disable the serializable state invariant middleware
        }),
    
})