import { Outlet } from "react-router-dom"
import LeftSideBar from "../components/LeftSideBar"
import { useEffect } from "react"
import appWriteService from '../appwrite/auth';
import { useDispatch } from "react-redux";
import { addProfile } from "../store/profileSlice";

function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    appWriteService.getUser().then((user) => {
      if (user) {
        console.log("user in home",user);
        //* {name:  ,email: }
        dispatch(addProfile(user));
      }
    })
  }, [])

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
