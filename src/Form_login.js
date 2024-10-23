import { Form, Input, Button, Alert } from "antd";
import React, { useState } from "react";

const Form_login = () => {
  const users = [
    { username: "admin", password: "admin" },
    { username: "user", password: "user" },
    { username: "guest", password: "guest" },
  ];

  const [showAlert, setShowAlert] = useState(false);

  const onFinish = (values) => {
    const { username, password } = values;

    const userFound = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userFound) {
      setShowAlert(false);
      console.log("Login successful", values);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="App_header">
      {showAlert && (
        <Alert
          type="error"
          message="Error"
          description="There was an error on login"
          className="AlertAlert"
          onClose={() => setShowAlert(false)}
          closable
        />
      )}
      <Form onFinish={onFinish}>
        <Form.Item
          label="User Name"
          name="username"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "Please input your username!" }]}>
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form_login;
