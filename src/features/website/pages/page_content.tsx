import React, { useState } from 'react'
import Banner from './banner';
const PageContent=({content})=> {

 
  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  
  return (  
     <>
     {content?.name==='About Us' &&
     <Banner/>
     }
     
     
      <div className='px-10'>
    <h1 className="text-2xl font-bold  text-green-600 sm:text-3xl">  {content?.title}</h1>
       
    {renderHTML(content?.pageContent)}  
    </div>


 </>
  )
}

export default PageContent