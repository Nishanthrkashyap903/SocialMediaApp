import React from 'react'
import { RTE, Input } from '../components/index'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import service from '../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Post({ className, ...props }) {

  const { register, control, handleSubmit, getValues } = useForm({
    defaultValues: {
      title: "",
      content: " ",
    }
  })

  const navigate=useNavigate();

  const userName =  useSelector((state)=>state.profile.name);
  const userId = useSelector((state)=>state.auth.userData.userId);

  const submit = async (data) => {
    console.log(data.content)
    const file=await service.uploadPost(data.image[0])
    console.log(file)
    //* {$id:  , bucketId: }
    if(file){
      console.log(file.$id)
      const dbPost=await service.createPost({UserId: userId ,Title: data.title,Content : data.content, PostImageID: file.$id, Name: userName})
      console.log("Post",dbPost);
      if(dbPost)
      {
        navigate('/home');
      }
      else{
        navigate('/home/post');
      }
    }
    else{
      navigate('/home/post');
    }
  }

  return (
    <div className={`${className} flex justify-center align-middle`}>
      <form className='w-full h-full' onSubmit={handleSubmit(submit)}>
        <Input label="Title: " labelSize={`text-xl`} {...register("title",{required: true})} />
        <RTE label="Content: " control={control} className={`w-full h-2/4 flex flex-col items-center`} defaultValue={getValues("Content")} />
        <Input label="Featured Image :"
          labelSize={`text-xl`}
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif" 
          {...register("image",{required: true}) }
        />
        <Button type="submit" className={`flex justify-center`} />

      </form>
    </div>
  )
}

export default Post
