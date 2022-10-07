import { useDispatch } from "react-redux";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  LoginOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Image, Layout } from "antd";
import Logo from "../features/icons/logo.png";
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
import React, { Children, useEffect, useState } from "react";
import LoginPage from "../login/login";
import { MailOutlined } from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { httpService } from "../service/http.service";
import { pageEndPoint } from "../api/primecareApi.endpoint";
import PageMenuloading from "./page_menu_loading";
import { setPageContent, setPagePath } from "../service/page.content";
import "./web_site_header.css";
import { Header } from "antd/lib/layout/layout";
import { isNamedExportBindings } from "typescript";
const WebSitHeader = ({ pages }) => {
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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

  return (
    <>
      <nav className="bg-fuchsia-0" style={{background:'#052501'}}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a className="block text-teal-600" href="/">
                  <span className="sr-only">Home</span>
                  <Image width={80} src={Logo} preview={false} />
                </a>
              </div>
          
                <div className="ml-5 flex items-baseline space-x-2 mt-0">
                  <Menu mode="horizontal" style={{width:'600px'}}>
                    {pages
                      ?.filter((x) => x.isParent === true)
                      .map((menu: any, index) => (
                        <>
                          {menu?.isParent === true &&
                          menu?.children?.length === 0
                            ? parentMenu(menu, index)
                            : subMenu(menu)}
                        </>
                      ))}
                    <Menu.Item>
                      <NavLink to="/members" style={{ color: "black" }}>
                        Members
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink to="/marketings" style={{ color: "black" }}>
                      Marketing
                      </NavLink>
                    </Menu.Item>
                  </Menu>
                </div>
            
            </div>
            <div className="md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  className="mx-auto lg:mx-0 font-bold rounded-full mt-4 lg:mt-0 py-2 px-4 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
                  type="button"
                  onClick={showDrawer}
                >
                  Login
                  <LoginOutlined />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Drawer
        title="Login to ESA"
        width={400}
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
