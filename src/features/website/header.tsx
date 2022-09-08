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
            className="inline-flex items-center justify-center px-5 py-3 text-gray-500 bg-white border border-gray-200 rounded-lg transition hover:text-gray-700 focus:outline-none focus:ring"
            type="button"
          >
            <span className="text-sm font-medium"> View Website </span>
  
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
  
          <button
            className="block px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button"
          >
            MemberShip Registration
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