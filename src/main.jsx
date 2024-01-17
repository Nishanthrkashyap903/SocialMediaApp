import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home';
import Post from './pages/Post';
import Profile from './pages/Profile';
import { Provider } from 'react-redux'
import store from './store/store'
import {AuthStatus,SignIn,SignUp} from './components/index'
import EditProfile from "./components/EditProfile"
import AllPosts from './pages/AllPosts';

// AuthLayout make sure that once the user 

const router=createBrowserRouter([
  {
    path:'/',
    element:<SignUp />,
  },
  {
    path:'/sign-in',
    element:<SignIn />,
  },
  {
    path:'/home',
    element:(
    <AuthStatus>
      <Home />
    </AuthStatus>
    ),
    children:[
      {
        path: '/home',
        element: <AllPosts />
      },
      {
        path:'/home/post',
        element:<Post className='w-full'/>
      }
      ,
      {
        path:'/home/profile',
        element:<Profile className='w-full'/>
      },
      {
        path:'/home/edit-profile',
        element: <EditProfile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)