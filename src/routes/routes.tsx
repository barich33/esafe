import React from 'react';

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

const MainRoutes=()=>{
  return(
    
    <Router>
      <Routes>
         {/*  Website routes */}
        <Route path="/" element={<PublicRoute />} >
              <Route path="admin/login" element={<LoginPage />} />               
              <Route path="about_us" element={<AboutUs />} /> 
              <Route path="/" element={<HomePage />} />
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
          <Route path="*" element={<DashBoard />} />
          </Route>
          <Route path="*" element={<DashBoard />} />
      </Routes>
    
   </Router>
  )
}
export default MainRoutes
