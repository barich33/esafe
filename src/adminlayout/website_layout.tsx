import { Route, Routes } from 'react-router'
import AboutUs from '../features/website/pages/about_us'
import WebsiteContent from './website_content'
import WebsiteFooter from './website_footer'

import WebSitHeader from './website_header'

const WebSiteLayout=()=> {
  return (
    <div className="flex flex-col h-screen">
    <div>
    <WebSitHeader/>
    </div>
    <main className="flex-1 overflow-y-auto">
    <WebsiteContent/>
    </main>
    <footer className="py-5 bg-gray-700 text-center text-white">
      <WebsiteFooter/>
    </footer>
  </div>
  )
}

export default WebSiteLayout