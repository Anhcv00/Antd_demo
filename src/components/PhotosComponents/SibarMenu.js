import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ButtonSibar, MenuSibar } from "../StyleComponents";

const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Workspace",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Projects",
  },
  {
    key: "sub1",
    label: "User Management",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "User List",
      },
      {
        key: "6",
        label: "User Groups",
      },
      {
        key: "7",
        label: "Permissions",
      },
      {
        key: "8",
        label: "Settings",
      },
    ],
  },
  {
    key: "sub2",
    label: "Reports",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "9",
        label: "Monthly Report",
      },
      {
        key: "10",
        label: "Annual Report",
      },
      {
        key: "sub3",
        label: "Statistics",
        children: [
          {
            key: "11",
            label: "User Statistics",
          },
          {
            key: "12",
            label: "Sales Statistics",
          },
        ],
      },
    ],
  },
  {
    key: "4",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    key: "sub4",
    label: "Support",
    icon: <QuestionCircleOutlined />,
    children: [
      {
        key: "13",
        label: "Documentation",
      },
      {
        key: "14",
        label: "FAQ",
      },
      {
        key: "15",
        label: "Contact Support",
      },
    ],
  },
];

const SibarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
        paddingLeft: 12,
      }}>
      <ButtonSibar
        type="default"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </ButtonSibar>
      <MenuSibar
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={[""]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default SibarMenu;
