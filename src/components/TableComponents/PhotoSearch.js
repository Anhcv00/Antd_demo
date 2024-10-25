import React from "react";
import { Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { InputSearch } from "./style.js";

const PhotoSearch = ({ value, onChange, onSearch, placeholder }) => {
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
      <div className="icon-user" style={{ float: "right" }}>
        <UserOutlined />
      </div>
    </div>
  );
};

export default PhotoSearch;
