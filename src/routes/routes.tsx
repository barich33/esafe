import React from 'react';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import App from '../App';
import Home from '../features/home';
import PatientList from '../features/patient/patient_list';
import Users from '../features/user/user_list';
import LoginPage from '../home/login';
import ProtectedRoute from './private.route';
import PublicRoute from './public.route';

const MainRoutes=()=>{

  return(
    
    <Router>
      <Routes>

        <Route path="/" element={<PublicRoute />} >
        <Route path="/" element={<LoginPage />} />  

        </Route>
         
        <Route
            path="dashboard"
            element={
              <ProtectedRoute
                redirectPath="/dashboard"
              />
            }
          >            
          <Route index={true} element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path='patient_list' element={<PatientList/>}/>
          <Route path="*" element={<Home />} />
          </Route>
          <Route path="*" element={<Home />} />
      </Routes>
    
   </Router>
  )
}
export default MainRoutes
