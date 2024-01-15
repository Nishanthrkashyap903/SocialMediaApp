import { Link, useNavigate, } from "react-router-dom"
import TopIcon from "./TopIcon";
import { Home, Mail, UserCircle2, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { removeProfile } from "../store/profileSlice";
import authService from "../appwrite/auth";
import service from "../appwrite/config";

function LeftSideBar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile);

  // console.log(userData);

  const sideBarItems = [
    {
      title: 'Home',
      icon: <Home className=" w-10 h-10 mr-4" />,
      link: '/home',
      status: 'active'
    }
    ,
    {
      title: 'Post',
      icon: <Mail className=" w-10 h-10 mr-4" />,
      link: '/home/post',
      status: 'active'
    }
    ,
    {
      title: 'Profile',
      icon: <UserCircle2 className=" w-10 h-10 mr-4" />,
      link: '/home/profile',
      status: 'active'
    }
    ,
  ]

  const logoutHandler = () => {
    authService.logout().then((status) => {
      console.log(status);
      dispatch(logout())
      dispatch(removeProfile());
      navigate('/');
    })
  }

  return (
    <aside className="flex h-screen w-1/3 flex-col overflow-y-auto border-r bg-white px-5 py-8 m">
      <TopIcon />
      <div className="mt-10 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 mb-10">
            {
              sideBarItems.map((item) => item.status === 'active' && (
                <Link to={`${item.link}`}>
                  <div
                    key={item.title}
                    className="flex transform items-center rounded-lg px-3 py-4 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"

                  >
                    {item.icon}
                    <span className="mx-2 text-2xl font-medium ">{item.title}</span>
                  </div>
                </Link>
              ))
            }
            <div
              key={'logout'}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
              onClick={logoutHandler}
            >
              <LogOut className=" w-10 h-10 mr-4" />
              <span className="mx-2 text-2xl font-medium ">{'logout'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-5 ">
            {userData.profileImage ?
              (<img
                className="inline-block h-20 w-20 rounded-full"
                src={service.getProfileImagePreview(userData.profileImageID)}
                alt="Profile-pic"
              />) :

              (<div className="flex justify-center items-center h-20 w-20 rounded-full bg-purple-600">
                <p className=" h-1/2 text-3xl text-white font-semibold ">
                  {userData.name ? userData.name[0].toUpperCase() : " "}
                </p>
              </div>)}
            <span className="flex flex-col">
              <span className="text-1xl font-medium text-gray-900 l">{userData.name}</span>
              <span className="text-1xl font-medium text-gray-500">{userData.email}</span>
            </span>
          </div>


        </nav>
      </div>
    </aside>

  )

}

export default LeftSideBar;
