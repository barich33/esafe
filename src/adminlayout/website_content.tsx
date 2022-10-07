import React from 'react'
import { Outlet } from 'react-router'

export default function WebsiteContent() {
  return (
    
    <div className="min-h-full">

  <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
   
    </div>
  </header>
  <main style={{backgroundColor:'#E8E8E8'}} className='mt-0'>
    <div className="mx-auto max-w-7xl py-4 sm:px-4 lg:px-6 mt-4" style={{backgroundColor:'#fff'}}>     
         <Outlet></Outlet>
    </div>
  </main>
</div>
  
  )
}
