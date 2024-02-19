import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:null,
    email:null,
    status:false,
    profileImage: false,
    profileImageID:null,
}

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        addProfile:(state,action)=>{
            state.email=action.payload.email;
            state.name=action.payload?.name || null;
            state.status=true    
        },
        removeProfile:(state,action)=>{
            state.email=null;
            state.name=null;
            state.status=false
        },
        addProfileImage:(state,action)=>{
            state.profileImage=true;
            state.profileImageID=action.payload?.ProfileImageId || null;
        },
        updateProfile:(state,action)=>{
            state.name=action.payload?.Name || null;
        },
        removeProfileImage:(state,action)=>{
            state.profileImage=false;
            state.profileImageID=null;
        }
    }
})

export const {addProfile,removeProfile,addProfileImage,updateProfile,removeProfileImage}=profileSlice.actions;
export default profileSlice.reducer;