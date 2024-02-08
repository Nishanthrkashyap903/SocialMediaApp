import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:null,
    email:null,
    status:false,
    profileImage: false,
    profileImageID:null,
    toggleEdited: false,
}

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        addProfile:(state,action)=>{
            state.email=action.payload.email;
            state.name=action.payload?.name || null;
            state.status=true
            state.toggleEdited=!state.toggleEdited
        },
        removeProfile:(state,action)=>{
            state.email=null;
            state.name=null;
            state.status=false
            state.toggleEdited=!state.toggleEdited
        },
        addProfileImage:(state,action)=>{
            state.profileImage=true;
            state.profileImageID=action.payload?.ProfileImageId || null;
            state.toggleEdited=!state.toggleEdited
        },
        updateProfile:(state,action)=>{
            state.name=action.payload?.Name || null;
            state.toggleEdited=!state.toggleEdited
        },
        removeProfileImage:(state,action)=>{
            state.profileImage=false;
            state.profileImageID=null;
            state.toggleEdited=!state.toggleEdited
        }
    }
})

export const {addProfile,removeProfile,addProfileImage,updateProfile,removeProfileImage}=profileSlice.actions;
export default profileSlice.reducer;