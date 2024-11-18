import styled from "styled-components";
import { Button, Table, Input, Menu, Form } from "antd";
import { Header } from "antd/es/layout/layout";

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
  height: auto;
  .ant-table-thead > tr > th {
    color: #fff !important;
    font-weight: bold !important;
    text-align: center;
    background-color: #1677ff !important;
    &:hover {
      cursor: pointer;
    }
  }
  tr > td {
    text-align: center;
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
export const FormDetails = styled(Form)`
  padding: 24px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 600px;
  margin: 0 auto;
`;

// Sign in

export const FormSignIn = styled(Form)`
  margin: 0 auto;
  padding: 24px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  height: auto;
  width: 500px;
  .ant-form-item-label {
    font-weight: bold;
  }
`;
export const FormSignInItem = styled(Form.Item)`
  span {
    height: 56px;
    font-size: 18px;
    line-height: 56px;
    align-items: center;
  }
`;
// Header layout

export const HeaderLayout = styled(Header)`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;
// DashBoard
export const StyledIcon = styled.div`
  color: ${(props) => props.color || "black"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border-radius: 50%;
  font-size: 24px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
