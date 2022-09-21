import React, { useState } from 'react'
const PageContent=({content})=> {

 
  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  
  return (  
     
<div className='px-10'>
    <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">  {content?.title}</h1>
       
    {renderHTML(content?.pageContent)}  
    </div>
 
  )
}

export default PageContent