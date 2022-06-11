import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
    const { isAuth } = useSelector((state) =>{
        return state.auth
    })
    if(!isAuth) {
        return <Navigate to="/login" replace />;
    }
  return <Outlet />;
}

export default ProtectedRoute