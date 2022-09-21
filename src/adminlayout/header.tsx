import { Application } from '../core';
import { Image } from 'antd';
import Logo from '../features/icons/logo.png';
import LogoutButton from '../shared/logout-button';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router';

import { MailOutlined } from '@ant-design/icons'
import { Divider, Menu } from 'antd'
import {NavLink, Outlet} from 'react-router-dom';
const PrimeCareHeader = () => {
  const MenuList = [
    {
     name:'Crops',
     route:'/admin/crops',
    },
    {
     name:'Users',
     route:'/admin/users',
    },
    {
     name:'Members',
     route:'/admin/members',
    
    },
    {
     name:'Pages',
     route:'/admin/pages',
   
    },
    
  ]
  const dispatch = useDispatch();
  const history =useNavigate();
  const goToHome = () => {
    const application: Application = {
      name: 'Home',
      code: 'HOME',
      url: 'admin/dashboard',
    };
    dispatch({ type: application });
    history('admin/dashboard')
  };

  let userInfo=localStorage.getItem('user'); 
  const loggedInUser = JSON.parse(userInfo ?? '{}');
  const user = `Welcome ${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

  return (
   
    <header className="bg-white  h-screen">
    <div className="px-20 mx-auto sm:px-30 lg:px-50">
      <div className="flex justify-between" >
        <div className="md:flex md:items-center md:gap-12">
          <a className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <Image preview={false}
      width={120}
      src={Logo}
    />
          </a>
          <Menu  mode="horizontal" className='bg-dark' >
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
        </div>
          
        <div className="md:flex md:items-center md:gap-3">
        <span>{user}</span>
            <LogoutButton/>         
        </div>
      </div>
    </div>    
    <div className="bg-white mx-10 pt-0 z-40 border-solid border-1 border-sky-500">
    <Outlet/>    
    </div>   
  </header>
  
  
  );
};

export default PrimeCareHeader;
