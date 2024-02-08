import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../appwrite/config';
import parse from "html-react-parser"
 
function AllPosts({ className }) {

  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth);
  const [profileImageID, setProfileImageID] = useState([]);
  const [posts, setPosts] = useState([]);
  const [names,setNames]=useState([]);
  // const toggleEdited=useSelector(state=>state.profile.toggleEdited);
  

  useEffect(() => {
    async function fetchData() {
      console.log('Allposts fetched');
      const posts = await service.getAllPosts();
      // console.log(posts);
      //* {total: ,documents:Array}
      if (posts?.total !== 0) {
        setPosts(posts.documents);

        for (let i = 0; i < posts.total; i++) {
          

          const profilePost = await service.getProfilePosts({name: "UserId" , value: posts.documents[i].UserId})
          if (profilePost?.total !== 0) {
            console.log("profilePost: ",profilePost);
            const userImageID=profilePost.documents[0].ProfileImageId;
            setProfileImageID((prevState)=>[...prevState,userImageID]);

            const name=profilePost.documents[0].Name;
            setNames((prevState)=>[...prevState,name]);
          }
        }
      }
    }
    fetchData();

  }, [navigate])
  return (
    <div className={`${className}`}>
      {posts.map((value,index) =>{
        return <PostCard key={value.$id} id={value.$id} title={value.Title} content={parse(value.Content)} Name={names[index]} PostImageID={value.PostImageID} profileImageID={profileImageID[index]} Likes={value.Likes}/>})}
     
    </div>
  )
}

export default AllPosts