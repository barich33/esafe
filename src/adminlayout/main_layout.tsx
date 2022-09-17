import { Route, Routes } from 'react-router'
import AboutUs from '../features/website/pages/about_us'
import PrimeCareHeader from './header'


const MainLayout=()=> {
  return (
<div className={`flex flex-col gap-4  relative h-full`}> 
<PrimeCareHeader />
 </div> 
  )
}

export default MainLayout