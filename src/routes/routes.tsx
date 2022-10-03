import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import DashBoard from '../features/dashboard';
import PatientList from '../features/patient/patient_list';
import Users from '../features/user/user_list';
import LoginPage from '../login/login';
import ProtectedRoute from './private.route';
import PublicRoute from './public.route';
import CropList from '../features/crop/crop_list';
import MemberList from '../features/member/member_list';
import AboutUs from '../features/website/pages/about_us';
import HomePage from '../features/website/pages/home';
import Service from '../features/website/pages/service';
import PageContent from '../features/website/pages/page_content';
import { httpService } from '../service/http.service';
import { pageEndPoint } from '../api/primecareApi.endpoint';
import SubMenu from 'antd/lib/menu/SubMenu';
import PageList from '../features/page/page_list';
import MembersPage from '../features/website/pages/memersPage/members';
import MarketingPage from '../features/website/pages/Marketing/marketings';


const MainRoutes=()=>{

  const [pages,setPages]=useState<any[]>([]);
  useEffect(() => {
    getPageList();
   // setLoading(false)
  }, []);
  
  
  const getPageList = () => {
    httpService
      .get(`${pageEndPoint.getPages}`)
      .then((response) => {
       
        const pages=response.data?.pages;
        setPages(pages);
        console.log("pages",pages);
       
      })
      .catch((error) => {
        
        setPages([]);
        console.error(error);
      });
  };

  return(
    
    <Router>
      <Routes>
         {/*  Website routes */}
        <Route path="/" element={<PublicRoute />} >
              <Route path="admin/login" element={<LoginPage />} />    
            
               {pages?.map((page:any, index) => (
                  <> 
                    <Route path={page?.route.replace("/","")} key={index}
                       element={<PageContent content={page}/>} />                     
                    {              
                    page.children?.map((children, submenuIndex) => (
                      
                       <Route path={children?.route.replace("/","")} key={submenuIndex}
                       element={<PageContent content={children}/>} />  
                    ))}
                  </>
                ))}
                {/* Routing for Static pages */}
                <Route path="/members" element={<MembersPage />} />
                <Route path="/marketings" element={<MarketingPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<HomePage />} />
        </Route>
          {/*  Website routes */}

        <Route  path="admin"          
           element={
              <ProtectedRoute
                redirectPath="/admin"
              />
            }
          >
            
          <Route index={true} element={<DashBoard />} />
          <Route path="users" element={<Users />} />
          <Route path='patient_list' element={<PatientList/>}/>
          <Route path='members' element={<MemberList/>}/>
          <Route path='crops' element={<CropList/>}/>
          <Route path='pages' element={<PageList/>}/>
          <Route path="*" element={<DashBoard />} />
          </Route>
           <Route path="*" element={<DashBoard />} /> 
      </Routes>
    
   </Router>
  )
}
export default MainRoutes
