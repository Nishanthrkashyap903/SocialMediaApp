import React, { useState } from 'react'
import { FileUp } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { useDispatch, useSelector, } from 'react-redux'
import Button, { } from './Button'
import service from '../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../store/profileSlice.js'
import Loader from './Loader.jsx'

function EditProfile({className}) {

  const userData = useSelector((state) => state.profile);
  const authUser = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
    }
  });

  // console.log(authUser.userData.$id);

  const submit = async (data) => {

    console.log(data)
    console.log(data.file[0]);

    
    setIsLoading(true);
    
    if (data.file[0]) {
      const file = await service.uploadPost(data.file[0])

      //*file: {$id: imageID,...} 

      if (file) {
        const getDocuments = await service.getProfilePosts({ name: "UserId", value: authUser.userData.userId })

        console.log(getDocuments);
        //{documents:[{$id: documentId}]}

        if (getDocuments && getDocuments.total === 0) {
          const dbPost = await service.createProfilePost({
            UserId: authUser.userData.userId,
            ProfileImageId: file.$id,
            Name: data.name,
            EmailId: data.email,
          })
          console.log(dbPost);
        }
        else {
          if (!getDocuments) return;
          else {
            console.log('update');
            const updateDocuments = await service.updateProfilePosts({ documentId: getDocuments.documents[0].$id, ProfileImageId: file.$id, Name: data.name })
            console.log(updateDocuments);
            dispatch(updateProfile(updateDocuments));
          }
        }
        
      }
    }
    // If file is not present then update
    else{

      console.log('update the name');
      const getDocuments = await service.getProfilePosts({ name: "UserId", value: authUser.userData.userId })

      console.log(getDocuments)

      //!If rows not found 
      if(getDocuments && getDocuments.total===0)
      {
        //*create a new row
        const dbPost = await service.createProfilePost({
          UserId: authUser.userData.userId,
          Name: data.name,
          EmailId: data.email,
        })
      }
      else{
        if (!getDocuments) return;

        else { //? if there is any rows then update

          if(getDocuments.ProfileImageId) 
          //* I image is present then just update the name
          {
            const updateDocuments = await service.updateProfilePosts({ documentId: getDocuments.documents[0].$id, ProfileImageId: getDocuments.ProfileImageId, Name: data.name });
            dispatch(updateProfile(updateDocuments));
          }
          else{ //~otherwise 
            const updateDocuments = await service.updateProfilePosts({ documentId: getDocuments.documents[0].$id, Name: data.name });
            dispatch(updateProfile(updateDocuments));
          }
        }
      }
    }
    setIsLoading(false);
    navigate('/home/profile');
  }

  return !isLoading ? (
    <>
      <form onSubmit={handleSubmit(submit)} className={`${className}`} >
        <div className="flex items-start justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-3/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileUp />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF </p>
            </div>
            <input id="dropzone-file" accept="image/png, image/jpg, image/jpeg, image/gif" type="file" className="hidden" {...register("file")} />
          </label>
        </div>

        <Input label={`Email address`} placeholder={userData.email} disabled={true} className='dark:placeholder-gray-400' type="email" {...register("email")} />

        <Input label={`Name`} placeholder={userData.name} className='placeholder-gray-900' {...register("name", { required: false })} />


        <Button className=' flex justify-center' type="submit" />

      </form>

    </>
  )
    :
    (
      <Loader className={`w-full h-full`}/>
    )


}

export default EditProfile