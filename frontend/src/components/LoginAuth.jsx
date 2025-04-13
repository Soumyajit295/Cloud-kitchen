import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function LoginAuth() {
  const {isLoggedIn} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
      if(!isLoggedIn){
        navigate('/login')
      }
  },[isLoggedIn,navigate])
  
  return isLoggedIn ? <Outlet/> : null
}

export default LoginAuth