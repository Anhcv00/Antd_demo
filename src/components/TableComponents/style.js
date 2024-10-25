import styled from "styled-components";
import { Button, Table, Input, Menu } from "antd";

export const ButtonWrapper = styled(Button)`
  width: 120px;
  height: 40px;
  &:hover {
    background-color: #11221f;
    color: #fff;
  }
  transition: background-color 0.3s ease;
`;

export const TableWrapper = styled(Table)`
  width: 1000px;
  height: auto;
  .ant-table-thead > tr > th {
    color: #fff !important;
    font-weight: bold !important;
    text-align: center;
    background-color: #1677ff !important;
    &:hover {
      cursor: pointer;
      color: black !important;
    }
  }
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  .ant-table-pagination {
    padding: 10px !important;
  }
`;

export const InputSearch = styled(Input)`
  width: 500px;
`;

export const ButtonSibar = styled(Button)`
  border: none;
  padding: 0;
`;
export const MenuSibar = styled(Menu)`
  .ant-menu-item {
    padding-left: 0px !important;
  }
  .ant-menu-submenu-title {
    padding-left: 0px !important;
  }
`;
