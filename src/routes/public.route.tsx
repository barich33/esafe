import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { isAuthenticated } from '../service/token.service'

const PublicRoute = ()=> {

  if (isAuthenticated()){
    return <Navigate to={'/dashboard'} replace />
  }
  else{
   return <Outlet />}
}

export default PublicRoute
