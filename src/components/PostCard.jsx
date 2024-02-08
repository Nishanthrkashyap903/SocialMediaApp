import React, { useState } from 'react'
import { Heart } from 'lucide-react';
import service from '../appwrite/config';
import { debounce } from 'lodash';

// TODO: Track Which posts are liked by which user
function PostCard({id, title, content, Name, PostImageID, profileImageID,Likes }) {
    const [clicked, setClicked] = useState(false);
    const [likes,setLikes]=useState(Likes? Likes : 0);

    async function addLike(){
        setClicked(prevState => !prevState); 
        
        const post=await service.getPost(id);
        
        if(post)
        {
            const likes=post.Likes;
            const update=await service.updatePost(id,likes+1);
            if(update)
            {
                setLikes(likes+1);
            }
            
        }
    }
    

    async function removeLike(){
        setClicked(prevState => !prevState); 
        
        const post=await service.getPost(id);
        
        if(post)
        {
            const likes=post.Likes;
            const update=await service.updatePost(id,likes-1);
            if(update)
            {
                setLikes(likes-1);
            }
            
        }
    }

    return (
        <>
            <div className="min-h-screen  bg-white flex justify-center items-center w-full">
                <div className="max-w-md container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                    <div>
                        <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 hover:underline cursor-pointer hover:text-gray-900 transition duration-100">{title}</h1>
                        <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">{content}</p>
                    </div>
                    {PostImageID && <img className="w-full bg-contain cursor-pointer" src={service.getProfileImagePreview(PostImageID)} alt="" />}
                    <div className="flex p-4 justify-around ">
                        <div className="flex items-center w-1/2 h-16">
                            {profileImageID && <img className="w-10 h-10 rounded-full" src={service.getProfileImagePreview(profileImageID)} alt="sara" />}

                            {/* <div className='w-14 h-10 rounded-[50%] bg-blue-600'></div> */}
                            <h2 className="text-gray-800 font-bold ml-16 cursor-pointer w-4/6 text-center">{Name}</h2>
                        </div>
                        <div className="flex space-x-2">
                            {/* <div className="flex space-x-1 items-center">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </span>
                                <span>22</span>
                            </div> */}
                            <div className="flex space-x-1 items-center">
                                <span>

                            
                                    {clicked ?
                                        //  Liked State
                                        <svg onClick={debounce(removeLike,1000)} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                        </svg> :

                                        // Unliked State
                                        <Heart onClick={debounce(addLike,1000)} className='text-red-500 cursor-pointer' strokeWidth={2} />
                                    }


                                </span>
                                <span>{likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostCard