import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AuthStatus({children}) {
    
    const authStatus=useSelector(state=>state.auth.status);
    const navigate=useNavigate();

    useEffect(()=>{
        if(authStatus)
        {
          console.log('home')
          navigate('/home');
        }
        else{
          navigate('/');
        }
    },[authStatus,navigate])

    return authStatus &&(
      <>
        {children}
      </>
  )
}

export default AuthStatus
