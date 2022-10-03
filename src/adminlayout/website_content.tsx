import React from 'react'
import { Outlet } from 'react-router'

export default function WebsiteContent() {
  return (
    
    <div className="min-h-full">

  <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
   
    </div>
  </header>
  <main>
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">     
         <Outlet></Outlet>
    </div>
  </main>
</div>
  
  )
}
