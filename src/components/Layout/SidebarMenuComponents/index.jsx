import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PictureOutlined,
  FileImageOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const SidebarMenuComponents = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/user-management">User Management</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<VideoCameraOutlined />}>
        <Link to="/video-management">Video Management</Link>
      </Menu.Item>
      <Menu.SubMenu key="4" icon={<UploadOutlined />} title="Upload Photos">
        <Menu.Item key="4-1">
          <Link to="/upload-photos/new">Upload New Photo</Link>
        </Menu.Item>
        <Menu.Item key="4-2">
          <Link to="/upload-photos/bulk">Bulk Upload</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="5" icon={<PictureOutlined />} title="Photos">
        <Menu.Item key="5-1" icon={<FileImageOutlined />}>
          <Link to="/photos/view">View Photos</Link>
        </Menu.Item>
        <Menu.Item key="5-2">
          <Link to="/photos/gallery">Photo Gallery</Link>
        </Menu.Item>
        <Menu.Item key="5-3">
          <Link to="/photos/settings">Photo Settings</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="6" icon={<UserOutlined />} title="Settings">
        <Menu.Item key="6-1">
          <Link to="/settings/profile">Profile Settings</Link>
        </Menu.Item>
        <Menu.Item key="6-2">
          <Link to="/settings/change-password">Change Password</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default SidebarMenuComponents;
