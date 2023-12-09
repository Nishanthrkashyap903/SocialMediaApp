import React from 'react'
import { useSelector } from 'react-redux'

function Profile({ className, ...props }) {

  const profile=useSelector((state)=>state.profile)

  return (
    <div className={`${className} flex items-start justify-center`}>
      <div className="flex flex-col items-center space-x-2">
        <img
          className="inline-block h-1/4 w-3/12 rounded-full "
          src="https://rapidkings.com/wp-content/uploads/2023/05/17kohli1.jpg"
          alt="Profile-image"
        />
        <span className="flex flex-col">
          <span className=" text-lg font-medium text-gray-900 text-center">{profile.name}</span>
          <span className="text-lg font-medium text-gray-500 text-center">{profile.email}</span>
        </span>
      </div>

    </div>
  )
}

export default Profile
