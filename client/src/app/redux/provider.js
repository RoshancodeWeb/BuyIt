"use client"
import { persistStore } from "redux-persist";
import { store } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";

const { Provider } = require("react-redux");

export const Providers=({children})=>{
    
    let persistor=persistStore(store);
    return <Provider store={store} >
            <PersistGate persistor={persistor}>
               {children}
            </PersistGate>
           </Provider>
}