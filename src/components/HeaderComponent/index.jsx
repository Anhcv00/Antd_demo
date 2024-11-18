import React from "react";
import { Layout, Menu, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import "./Header.css";
import logo_header from "../../assets/img/Logo_Header.png";

const HeaderComponent = () => {
  return (
    <Layout.Header className="header">
      <div className="header-section menu-container">
        <Menu theme="dark" mode="horizontal" className="menu">
          <Menu.Item key="1">Live Rooms</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Guide</Menu.Item>
          <Menu.Item key="4">Contact</Menu.Item>
        </Menu>
      </div>

      <div className="header-section logo">
        <img src={logo_header} alt="Logo" />
      </div>

      <div className="header-section header-buttons">
        <Button type="primary" className="login-button">
          LOGIN
        </Button>
        <Button icon={<GlobalOutlined />} className="language-button">
          KR
        </Button>
      </div>
    </Layout.Header>
  );
};

export default HeaderComponent;
