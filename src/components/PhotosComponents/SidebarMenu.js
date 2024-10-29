// SidebarMenu.js
import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PictureOutlined,
  FileImageOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const SidebarMenu = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <PieChartOutlined />,
          label: "Dashboard",
        },
        {
          key: "2",
          icon: <UserOutlined />,
          label: "User Management",
        },
        {
          key: "3",
          icon: <VideoCameraOutlined />,
          label: "Video Management",
        },
        {
          key: "4",
          icon: <UploadOutlined />,
          label: "Upload Photos",
          children: [
            {
              key: "4-1",
              label: "Upload New Photo",
            },
            {
              key: "4-2",
              label: "Bulk Upload",
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
              icon: <FileImageOutlined />,
              label: "View Photos",
            },
            {
              key: "5-2",
              label: "Photo Gallery",
            },
            {
              key: "5-3",
              label: "Photo Settings",
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
              label: "Profile Settings",
            },
            {
              key: "6-2",
              label: "Change Password",
            },
          ],
        },
      ]}
    />
  );
};

export default SidebarMenu;
