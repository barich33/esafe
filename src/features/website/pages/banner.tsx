import React from 'react'
import banner from "./images/banner.png";
const Banner=()=> {
  return (
    <section
    
    className="relative  bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${banner})` }}
  >
    <div
      className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"
    ></div>
  
    <div
      className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-12"
    >
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
                 <strong className="block font-extrabold text-rose-700">
                 Helping Ethiopia’s Food Security!
          </strong>
        </h1>
  
        
       
      </div>
    </div>
  </section>
  )
}

export default Banner