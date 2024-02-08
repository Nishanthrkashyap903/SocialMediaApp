import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {addProfileImage, updateProfile, removeProfileImage} from '../store/profileSlice.js'
import service from '../appwrite/config'

function Profile({ className, ...props }) {
  const navigate = useNavigate();
  const authData=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  
  useEffect(()=>{
    async function fetchData (){
      const getDocuments=await service.getProfilePosts({name:"UserId",value:authData.userData.userId});
      console.log('leftSideBar:',getDocuments);
      if(getDocuments.total!==0)
      {
        if(getDocuments.documents[0].ProfileImageId)
        {
          dispatch(addProfileImage(getDocuments.documents[0]))
        }
        else{
          dispatch(removeProfileImage());
        }
        dispatch(updateProfile(getDocuments.documents[0]));
      }
      else{
        console.log('remove Profile')
        dispatch(removeProfileImage());
      }
    } 
    
    fetchData();
  },[navigate])

  const profile = useSelector((state) => state.profile);


  return (
    <div className={`${className} flex items-start justify-center`}>
      <div className="flex flex-col items-center space-x-2 w-3/4 h-[70%]">
        {
          profile.profileImage ? (
            <img
              className="mt-10 inline-block h-1/3 w-1/4 rounded-full "
              src={service.getProfileImagePreview(profile.profileImageID)}
              alt="Profile-image"
            />
          ) :
            (
              <div className="flex mt-10 justify-center items-center h-1/3 w-1/4 rounded-full bg-purple-600">
                <p className=" h-1/4  text-5xl  text-white font-semibold ">
                  {profile.name[0].toUpperCase()}
                </p>
              </div>
            )
        }

        <span className="flex flex-col">
          <span className=" mt-10 text-lg font-medium text-gray-900 text-center">{profile.name}</span>
          <span className="text-lg font-medium text-gray-500 text-center">{profile.email}</span>
        </span>

        <Link to="/home/edit-profile">
          <button className="mt-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Edit Profile</button>
        </Link>
      </div>

    </div>
  )
}

export default Profile
