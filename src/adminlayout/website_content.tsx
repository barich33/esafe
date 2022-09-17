import React from 'react'
import { Outlet } from 'react-router'

export default function WebsiteContent() {
  return (
    <div className="mx-10 pt-5 z-40 border-solid border-1 border-sky-500 border-bold">
    <Outlet />
  </div>
  )
}
