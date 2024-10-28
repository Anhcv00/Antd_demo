import React from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { InputSearch } from "../StyleComponents/index.js";
import { Avatar, Badge, Dropdown, Menu } from "antd";

const PhotoSearch = ({ value, onChange, onSearch, placeholder }) => {
  const handleClickUser = ({ key }) => {
    if (key === "profile") {
      console.log("Go to Profile");
      //
    } else if (key === "logout") {
      //
      window.location.href = "/";
    }
  };
  const menu = (
    <Menu onClick={handleClickUser}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );
  return (
    <div className="header-search">
      <InputSearch
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        suffix={
          <SearchOutlined
            onClick={onSearch}
            style={{ color: "rgba(0,0,0,.45)" }}
          />
        }
        onPressEnter={onSearch}
      />
      <Dropdown overlay={menu} trigger={["click"]}>
        <Badge count={1}>
          <Avatar
            style={{ backgroundColor: "#4096ff", cursor: "pointer" }}
            shape="square"
            icon={<UserOutlined />}
          />
        </Badge>
      </Dropdown>
    </div>
  );
};

export default PhotoSearch;
