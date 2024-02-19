import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import fetchedSlice from "./fetchedSlice";

const store=configureStore(
    {
        reducer:{
            auth:authSlice,
            profile:profileSlice,
            fetched: fetchedSlice,
        }
    }
)

export default store;