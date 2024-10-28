import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { FormSignIn, FormSignInItem } from "../StyleComponents";
import "../../assets/css/login.css";
import logo from "../../assets/img/sign-in-image.png";
import { Link } from "react-router-dom";
import {
  saveAccountsToStorage,
  getAccountsFromStorage,
} from "../../store/store";

const SignUpComponents = () => {
  const onFinish = (values) => {
    const accounts = getAccountsFromStorage();
    // validate email
    const emailExists = accounts.some((item) => item.email === values.Email);
    if (emailExists) {
      message.error("Email đã tồn tại. Vui lòng đăng ký với email khác");
      return;
    }
    const newAccount = {
      id: accounts.length + 1,
      firstName: values.Firstname,
      lastName: values.LastName,
      email: values.Email,
      password: values.Password,
      role: "user",
    };
    // save new account
    const updatedAccounts = [...accounts, newAccount];
    saveAccountsToStorage(updatedAccounts);

    message.success("Thêm mới thành công!");
    window.location.href = "/";
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-sign-up">
          <div className="sign-up-content">
            {/* Phần hình ảnh bên trái */}
            <div className="sign-up-images">
              <img src={logo} alt="Logo" />
            </div>
            {/* Phần form đăng nhập */}
            <div style={{ padding: "2rem" }}>
              <h1 style={{ textAlign: "center" }}>Sign Up</h1>
              <FormSignIn
                name="login"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}>
                <FormSignInItem
                  name="Firstname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}>
                  <Input prefix={<UserOutlined />} placeholder="Firstname..." />
                </FormSignInItem>

                <FormSignInItem
                  name="LastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}>
                  <Input prefix={<LockOutlined />} placeholder="Lastname..." />
                </FormSignInItem>
                <FormSignInItem
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}>
                  <Input
                    prefix={<LockOutlined />}
                    type="email"
                    placeholder="Email.."
                  />
                </FormSignInItem>
                <FormSignInItem
                  name="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}>
                  <Input
                    prefix={<LockOutlined />}
                    placeholder="Password..."
                    type="password"
                  />
                </FormSignInItem>

                <Form.Item>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Form.Item name="authen" valuePropName="checked" noStyle>
                      <Checkbox>
                        I want to receive emails about the product, feature
                        updates, events, and marketing promotions.
                      </Checkbox>
                    </Form.Item>
                  </div>
                </Form.Item>

                <FormSignInItem>
                  <Button block type="primary" htmlType="submit">
                    Sign up
                  </Button>
                  or <Link to="/">Login now!</Link>
                </FormSignInItem>
              </FormSignIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponents;
