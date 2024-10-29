import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { InputSearch } from "../../Style";

const PhotoSearchComponents = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
}) => {
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
            aria-label="search icon"
          />
        }
        onPressEnter={onSearch}
      />
    </div>
  );
};

export default PhotoSearchComponents;
