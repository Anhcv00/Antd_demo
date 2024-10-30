import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PictureOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const SidebarMenuComponents = () => {
  const menuItems = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/user-management">User Management</Link>,
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: <Link to="/video-management">Video Management</Link>,
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Upload Photos",
      children: [
        {
          key: "4-1",
          label: <Link to="/upload-photos/new">Upload New Photo</Link>,
        },
        {
          key: "4-2",
          label: <Link to="/upload-photos/bulk">Bulk Upload</Link>,
        },
      ],
    },
    {
      key: "5",
      icon: <PictureOutlined />,
      label: "Photos",
      children: [
        {
          key: "5-1",
          label: <Link to="/photos/view">View Photos</Link>,
        },
        {
          key: "5-2",
          label: <Link to="/photos/gallery">Photo Gallery</Link>,
        },
        {
          key: "5-3",
          label: <Link to="/photos/settings">Photo Settings</Link>,
        },
      ],
    },
    {
      key: "6",
      icon: <UserOutlined />,
      label: "Settings",
      children: [
        {
          key: "6-1",
          label: <Link to="/settings/profile">Profile Settings</Link>,
        },
        {
          key: "6-2",
          label: <Link to="/settings/change-password">Change Password</Link>,
        },
      ],
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={menuItems}
    />
  );
};

export default SidebarMenuComponents;
