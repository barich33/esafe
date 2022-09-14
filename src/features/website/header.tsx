import { PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import Logo from '../../features/icons/logo.webp';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginPage from '../../login/login';
const HeaderPage = ({message = ''}) => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate()
  const onLogin = async () => {
    debugger
    localStorage.clear();
    sessionStorage.clear()
    navigate('admin/login')
  };
  const onAboutUs = async () => {
    debugger
    localStorage.clear();
    sessionStorage.clear()
    navigate('/about_us')
  };
  return (
    <>
    <header className="bg-gray-50">
    <div className="px-4 py-8 mx-auto  sm:py-12 sm:px-6 lg:px-8">
      <div className="sm:justify-between sm:items-center sm:flex">
        <div className="text-center sm:text-left">
        <Image
      width={120}
      src={Logo}/>
        
          {/* <p className="mt-1.5 text-sm text-gray-500">
            Let's write a new blog post! 🎉
          </p> */}
        </div>
  
        <div className="flex flex-col mt-4 gap-4 sm:flex-row sm:mt-0 sm:items-center">
           
          <button
            className="block px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button" onClick={onAboutUs}
          >
            About Us
          </button>
          <button
            className="block px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button"
          >
          Contact Us
          </button>
          <button
            className="block px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button" onClick={showDrawer}
          >
           Login
          </button>
        </div>
      </div>
    </div>
  </header>

<Drawer
title="Login to ESA"
width={720}
onClose={onClose}
open={open}
bodyStyle={{ paddingBottom: 200 }}
extra={
  <Space>
    <Button onClick={onClose}>Cancel</Button>
    {/* <Button onClick={onClose} type="primary">
      Submit
    </Button> */}
  </Space>
}
>
<LoginPage/>
</Drawer>
</>
  );
};

export default HeaderPage;