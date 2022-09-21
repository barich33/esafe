const PAGECONTENT ='page_content'
const PAGEPATH ='page_path'
export const setPageContent = (page_content:any)=>{
  sessionStorage.setItem(PAGECONTENT,page_content)
}

export const getPageContent = () => {
  return sessionStorage.getItem(PAGECONTENT)
}

export const setPagePath = (page_path:any)=>{
  sessionStorage.setItem(PAGEPATH,page_path)
}

export const getPagePath = () => {
  return sessionStorage.getItem(PAGEPATH)
}

