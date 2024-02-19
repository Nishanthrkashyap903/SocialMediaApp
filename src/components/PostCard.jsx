import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react';
import service from '../appwrite/config';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import DropDown from './DropDown';

// TODO: Track Which posts are liked by which user
function PostCard({ id, title, content, Name, PostImageID, profileImageID, Likes, isLiked, userId, likedPostId }) {

    const [likes, setLikes] = useState(Likes);
    const [isPrevLiked, setIsPrevLiked] = useState(isLiked || false)
    const [LikedPostId, setLikedPostId] = useState(likedPostId);
    const [isClicked, setIsClicked] = useState(false);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        // console.log("Post Card mounted. ");
        // console.log("Props: ID->", id, "Title->", title, "Content->", content, "Name->", Name, "PostImageID->", PostImageID, "ProfileImageID->", profileImageID, "Likes->", Likes, "IsLiked->", isLiked, "UserId->", userId, "LikedPostID->", likedPostId);
        setIsPrevLiked(isLiked);
        setEnabled(true);
    }, [isLiked])

    useEffect(() => {
        // console.log("LikedPostID->", likedPostId);
        setLikedPostId(likedPostId);
    }, [likedPostId])

    async function addLike() {

        const post = await service.getPost(id);
        // console.log("Post:", post);
        if (post) {
            const postLikes = post.Likes;
            const updated = await service.updatePost(id, postLikes + 1);
            // console.log("Updated: ", updated);
            if (updated) {
                const createLikedPost = await service.createLikedPost({ PostId: id, UserId: userId })
                // console.log("create Liked Post: ", createLikedPost);
                if (createLikedPost) {
                    setLikes((prevLikes) => prevLikes + 1);
                    setIsClicked(true);
                    setLikedPostId(createLikedPost.$id);
                }
            }
        }
    }


    async function removeLike() {

        const post = await service.getPost(id);
        if (post) {
            const postLikes = post.Likes;
            const updated = await service.updatePost(id, postLikes - 1);
            // console.log("Updated: ", updated);
            if (updated) {
                const deleteLikedPost = await service.deleteLikedPost(LikedPostId);
                // console.log("deleted Liked Post: ", deleteLikedPost);
                if (deleteLikedPost) {
                    setLikes((prevLikes) => prevLikes - 1);
                    setIsPrevLiked(false);
                    setIsClicked(false);
                    setLikedPostId(undefined);
                }
            }
        }
    }

    return (
        <>
            
            <div className="min-h-screen  bg-white flex justify-center items-center w-full">
                <div className="max-w-md container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                    <div className='flex w-[100%] justify-between'>
                        <div>
                            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 hover:underline cursor-pointer hover:text-gray-900 transition duration-100">{title}</h1>
                            <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">{content}</p>

                        </div>
                        <DropDown />
                    </div>
                    {PostImageID && <img className="w-full bg-contain cursor-pointer" src={service.getProfileImagePreview(PostImageID)} alt="" />}
                    <div className="flex p-4 justify-around ">
                        <div className="flex items-center w-1/2 h-16">
                            {profileImageID ?
                                <img className="w-10 h-10 rounded-full" src={service.getProfileImagePreview(profileImageID)} alt="sara" />
                                :
                                <div className='w-14 h-10 rounded-[50%] bg-purple-600'>{Name ? Name[0].toUpperCase() : ''}</div>
                            }

                            <h2 className="text-gray-800 font-bold ml-16 cursor-pointer w-4/6 text-center">{Name}</h2>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex space-x-1 items-center">
                                <span>
                                    {(isPrevLiked || isClicked) ?

                                        (<svg onClick={enabled ? debounce(removeLike, 1000) : () => { console.log('Disabled') }} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>)
                                        :

                                        (<Heart onClick={enabled ? debounce(addLike, 1000) : () => { console.log('Disabled') }} className='text-red-500 cursor-pointer' strokeWidth={2} />)
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