import React from 'react'
import { MailOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import {NavLink, Outlet} from 'react-router-dom';
import ShellEmpty from '../routes/shell-empty';
const SideBar=()=> {
  const MenuList = [
    {
     name:'Dashboard',
     route:'/dashboard',
    },
    {
     name:'Users',
     route:'/dashboard/users',
    },
    {
     name:'Patients',
     route:'/dashboard/patient_list',
     icon:<MailOutlined/>
    },
    {
     name:'System Configurations',
     route:'/dashboard/settings',
     icon:<MailOutlined/>
    }
  ]
  return (
    <div>     
    <div className='flex flex-row w-full main-container fixed'>
   
      <Menu style={{backgroundColor:'white',color:'black'}}>
      {
           MenuList.map((menu, index)=>(
          <Menu.Item key={index}>
            <NavLink to={menu.route} style={{color:'black'}}>
            {menu.name}
            </NavLink>
          </Menu.Item>
        ))
      }      
      </Menu>
  
    <div className="w-full mr-4 bg-white pt-0 ml-0 p-30 overflow-scroll z-40">
    <Outlet/>    
    </div>
    </div>     
    </div>
  )
}
export default SideBar
