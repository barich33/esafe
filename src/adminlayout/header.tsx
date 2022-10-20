import { Application } from '../core';
import { Image } from 'antd';
import Logo from '../features/icons/logo.png';
import LogoutButton from '../shared/logout-button';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router';

import { MailOutlined } from '@ant-design/icons'
import { Divider, Menu } from 'antd'
import {NavLink, Outlet} from 'react-router-dom';
import { Icon } from '@iconify/react';
const PrimeCareHeader = () => {
  const MenuList = [
    {
     name:'Crops',
     route:'/admin/crops',
     isParent:true,     
     children:[],
     roles:['Administrator','Editor']
    },
    {
     name:'Users',
     route:'/admin/users',
     isParent:true,
     children:[],
     roles:['Administrator']
    },
    {
     name:'Organizations',
     route:'/admin/members',
     isParent:true,
     children:[],
     roles:['Administrator','Editor']
    },
    {
     name:'Pages',
     route:'/admin/pages',  
     isParent:true, 
     children:[],
     roles:['Administrator','Editor']
    }
    ,
    {
     name:'Configurations',
     route:'/admin/configurations',  
     isParent:true, 
     roles:['Administrator','Editor'],
     children:[
      {
        name:'Crop Types',
        route:'/admin/cropTypes',   
       },
       {
        name:'Customers',
        route:'/admin/customers',   
       },
       {
        name:'Diseases',
        route:'/admin/diseases',   
       },
       {
        name:'Insects',
        route:'/admin/insects',   
       },
       {
        name:'SoilTypes',
        route:'/admin/soilTypes',   
       },
       {
        name:'Varieties',
        route:'/admin/varieties',   
       },
     ]
    },
    
  ]
  
  const parentMenu = (menu, index) => {
    return (
      <>
        <Menu.Item key={menu.name}>
          <NavLink to={menu.route} style={{ color: "black" }}>
            {menu.name}
          </NavLink>
        </Menu.Item>
      </>
    );
  };

  const subMenu = (menu) => {
    return (
      <>
        <Menu.SubMenu title={menu?.name} key={menu?.name}>
          <NavLink
            to={menu?.route}
            style={{ color: "black" }}
            className="px-3 py-2 rounded-md text-sm font-medium"
          ></NavLink>

          {menu.children?.map((childMenu, index) => (
            <Menu.Item key={index}>
              <NavLink to={childMenu.route} style={{ color: "black" }}>
                {childMenu.name}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </>
    );
  };

  function roleExists(allowedRoles, userRoles) {     
    // Loop for allowedRoles
    for(let i = 0; i < allowedRoles.length; i++) {         
        // Loop for userRoles
        for(let j = 0; j < userRoles.length; j++) {
             
            // Compare the element of each and
            // every element from both of the
            // arrays
            if(allowedRoles[i] === userRoles[j]) {             
                // Return if common element found
                return true;
            }
        }
    }
     
    // Return if no common element exist
    return false;
}
 

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
 console.log(loggedInUser);
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
               <Menu mode="horizontal" style={{width:'600px'}}>
                    {MenuList
                      ?.filter((x) => x.isParent === true && roleExists(x.roles,loggedInUser?.roles))
                      .map((menu: any, index) => (
                        <>
                          {menu?.isParent === true &&
                          menu?.children?.length === 0
                            ? parentMenu(menu, index)
                            : subMenu(menu)}
                        </>
                      ))}
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
