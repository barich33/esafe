import React from 'react'
import { Navigate, Outlet } from 'react-router'
import WebSiteLayout from '../adminlayout/website_layout'
import { isAuthenticated } from '../service/token.service'

const PublicRoute = ()=> {

  if (isAuthenticated()){
    return <Navigate to={'/admin'} replace />
  }
  else{
    return (
      <WebSiteLayout></WebSiteLayout>
    )
  }
}

export default PublicRoute
