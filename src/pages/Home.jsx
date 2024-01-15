import { Outlet, useNavigate } from "react-router-dom"
import LeftSideBar from "../components/LeftSideBar"
import { useEffect } from "react"
import appWriteService from '../appwrite/auth';
import { useDispatch } from "react-redux";
import { addProfile,removeProfileImage ,addProfileImage } from "../store/profileSlice";
import service from "../appwrite/config";

function Home() {

  const navigate=useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    appWriteService.getUser().then((user) => {
      if (user) {
        console.log("user in home",user);
        //* {name:  ,email: }
        dispatch(addProfile(user));
        console.log('details in home',user.name,user.$id);
        service.getProfilePosts({name: 'UserId' , value: user.$id})
        .then((getDocuments)=>{
          console.log('documents in home',getDocuments);
          
          if (!getDocuments || getDocuments.total===0)
          {
            dispatch(removeProfileImage())
          }
          else{
            dispatch(addProfileImage(getDocuments.documents[0]))
          }
        })
      }
    })

    
  }, [navigate]);

  return (
    <>
      <div className=" flex">
        <LeftSideBar />
        <Outlet />
      </div>
    </>
  )
}

export default Home
