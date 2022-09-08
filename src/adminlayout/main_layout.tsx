import PrimeCareHeader from './header'
import SideBar from './side_bar'

const MainLayout=()=> {
  return (
<div className={`flex flex-col gap-4  relative h-full`}> 
<PrimeCareHeader />
{/*  <SideBar /> */}
 </div> 
  )
}

export default MainLayout