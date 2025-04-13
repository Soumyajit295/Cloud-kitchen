import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function AdminAuth() {
  const {user} = useSelector((state)=>state.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user.role!=='seller'){
        navigate('/unauthorized')
    }
  },[user,navigate])
  
  return user?.role === 'seller' ? <Outlet/> : null
}

export default AdminAuth