import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:null,
    email:null,
    status:false,
    profileImage: false,
    profileImageID:null
}

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        addProfile:(state,action)=>{
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.status=true
        },
        removeProfile:(state,action)=>{
            state.email=null;
            state.name=null;
            state.status=false
        },
        addProfileImage:(state,action)=>{
            state.profileImage=true;
            state.profileImageID=action.payload.ProfileImageId;
        },
        updateProfile:(state,action)=>{
            state.name=action.payload.Name;
        }
    }
})

export const {addProfile,removeProfile,addProfileImage,updateProfile}=profileSlice.actions;
export default profileSlice.reducer;