// PhotoPageComponents.js
import React, { useState } from "react";
import { Layout, theme } from "antd";
import SidebarMenuComponents from "./SidebarMenuComponents";
import HeaderComponents from "./HeaderComponents";

import FooterComponents from "./FooterComponents";
import logo from "../../assets/img/logo.png";

import { Outlet } from "react-router-dom";
const { Sider } = Layout;
const LayoutComponents = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical">
          <img src={logo} alt="logo" />
        </div>
        <SidebarMenuComponents />
      </Sider>
      <Layout>
        <HeaderComponents collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="view-content">
          <Outlet />
        </div>
        <FooterComponents />
      </Layout>
    </Layout>
  );
};

export default LayoutComponents;
