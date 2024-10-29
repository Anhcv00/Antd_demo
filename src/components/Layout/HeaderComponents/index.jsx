// HeaderComponents.js
import React from "react";
import { Button, Avatar, Badge, Dropdown, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../Style";

const HeaderComponents = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleClickUser = ({ key }) => {
    if (key === "profile") {
      console.log("Go to Profile");
      navigate("/profile");
    } else if (key === "logout") {
      localStorage.removeItem("authToken");
      navigate("/", { replace: true });
    }
  };

  const userMenu = () => (
    <Menu onClick={handleClickUser}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <HeaderLayout>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: "16px", width: 64, height: 64 }}
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
  );
};

export default HeaderComponents;
