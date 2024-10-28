import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { FormSignIn, FormSignInItem } from "../StyleComponents";
import "../../assets/css/login.css";
import logo from "../../assets/img/sign-in-image.png";
import { Link } from "react-router-dom";
import { getAccountsFromStorage } from "../../store/store.js";

const SignInComponents = () => {
  const onFinish = (values) => {
    const acounts = getAccountsFromStorage();
    console.log("acount store", acounts);
    console.log(values);
    const matchedAccount = acounts.find(
      (account) =>
        account.email === values.email && account.password === values.password
    );

    if (matchedAccount) {
      localStorage.setItem("isLogin", true);
      window.location.href = "/photos";
    } else {
      message.error("Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-sign-in">
          <div className="sign-in-content">
            {/* Phần hình ảnh bên trái */}
            <div className="sign-in-images">
              <img src={logo} alt="Logo" />
            </div>
            {/* Phần form đăng nhập */}
            <div style={{ padding: "2rem" }}>
              <h1 style={{ textAlign: "center" }}>Login</h1>
              <FormSignIn
                name="login"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}>
                <FormSignInItem
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}>
                  <Input prefix={<MailOutlined />} placeholder="Email...." />
                </FormSignInItem>

                <FormSignInItem
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}>
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password..."
                  />
                </FormSignInItem>
                <Form.Item>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a href="">Forgot password</a>
                  </div>
                </Form.Item>

                <FormSignInItem>
                  <Button block type="primary" htmlType="submit">
                    Log in
                  </Button>
                  or <Link to="/sign-up">Register now!</Link>
                </FormSignInItem>
              </FormSignIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponents;
