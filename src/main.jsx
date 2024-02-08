import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Home, Post, Profile, AllPosts } from './pages/index'

import { Provider } from 'react-redux'
import store from './store/store'
import { AuthStatus, SignIn, SignUp, EditProfile } from './components/index'

// AuthLayout make sure that once the user 

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/home',
    element: (
      <AuthStatus>
        <Home />
      </AuthStatus>
    ),
    children: [
      {
        path: '/home',
        element: <AllPosts className='w-full h-full' />
      },
      {
        path: '/home/post',
        element: <Post className='w-full h-full' />
      }
      ,
      {
        path: '/home/profile',
        element: <Profile className='w-full h-full' />
      },
      {
        path: '/home/edit-profile',
        element: <EditProfile className='w-full h-full' />
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)