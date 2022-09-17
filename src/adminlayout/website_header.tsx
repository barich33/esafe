import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Image } from "antd";
import Logo from "../features/icons/logo.webp";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import LoginPage from "../login/login";
import { MailOutlined } from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const WebSitHeader = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const MenuList = [
    {
      name: "AboutUs",
      route: "/about_us",
    },
    {
      name: "Services",
      route: "/admin/about_us",
    },
    {
      name: "Members",
      route: "/admin/members",
    },
    {
      name: "Settings",
      route: "/admin/settings",
    },
  ];
  const dispatch = useDispatch();
  const history = useNavigate();
  const goToHome = () => {
    history("admin/dashboard");
  };

  let userInfo = localStorage.getItem("user");
  const loggedInUser = JSON.parse(userInfo ?? "{}");
  const user = `Welcome ${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

  return (
    <>
      <header className="shadow-sm items-center h-16 px-4 mx-auto  gap-8 sm:px-6 lg:px-8 ">
        <div className="px-20 mx-auto sm:px-30 lg:px-50">
          <div className="flex justify-between mt-0">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <Image width={80} src={Logo} />
              </a>
              <Menu mode="horizontal" className="text-gray-900  text-sm font-medium" >
                {MenuList.map((menu, index) => (
                  <Menu.Item key={index}>
                    <NavLink to={menu.route} style={{ color: "black" }}>
                      {menu.name}
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu>
            </div>

            <div className="md:flex md:items-center md:gap-3">
              <button
                className="mx-auto lg:mx-0 bg-red text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-2 px-4 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                type="button"
                onClick={showDrawer}
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
          </Space>
        }
      >
        <LoginPage />
      </Drawer>
    </>
  );
};

export default WebSitHeader;
