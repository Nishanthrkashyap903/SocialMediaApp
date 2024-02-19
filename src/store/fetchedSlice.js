import { createSlice } from "@reduxjs/toolkit";

const initialState={
    toggleFetched: false
}

const fetchSlice=createSlice(
    {
        name: "fetched",
        initialState,
        reducers:{
            toggle: (state,action)=>{
                state.toggleFetched=!state.toggleFetched;
            }
        }
    }
)

export const {toggle}=fetchSlice.actions;
export default fetchSlice.reducer;
