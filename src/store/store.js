import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";

const store=configureStore(
    {
        reducer:{
            auth:authSlice,
            profile:profileSlice,
        }
    }
)

export default store;