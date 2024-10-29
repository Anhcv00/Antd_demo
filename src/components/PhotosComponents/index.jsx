import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Avatar, Badge, Dropdown } from "antd";
import Photos from "./Photos.js";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../StyleComponents";
import SidebarMenu from "./SidebarMenu";
const { Sider, Content } = Layout;

const PhotosComponents = () => {
  const navigate = useNavigate();

  const handleClickUser = ({ key }) => {
    if (key === "profile") {
      console.log("Go to Profile");
      // Logic bổ sung cho điều hướng profile
      navigate("/profile");
    } else if (key === "logout") {
      // Thao tác đăng xuất
      localStorage.removeItem("authToken");
      navigate("/", { replace: true });
    }
  };

  const userMenu = () => {
    return (
      <Menu onClick={handleClickUser}>
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="logout">Logout</Menu.Item>
      </Menu>
    );
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical">
          <img src={logo} />
        </div>
        <SidebarMenu />
      </Sider>
      <Layout>
        <HeaderLayout>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown overlay={userMenu()} trigger={["click"]}>
            <Badge count={1}>
              <Avatar
                style={{ backgroundColor: "#4096ff", cursor: "pointer" }}
                shape="square"
                icon={<UserOutlined aria-label="user icon" />}
              />
            </Badge>
          </Dropdown>
        </HeaderLayout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          <Photos />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PhotosComponents;
