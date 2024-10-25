import { Input, Select, Space } from "antd";
import Form from "antd/es/form/Form";
import React from "react";

const Form_custom = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Space>
      <div className="App-header">
        <Form>
          <Form.Item label="Username: ">
            <Input placeholder="Enter name..." />
          </Form.Item>
          <Form.Item label="Email: ">
            <Input placeholder="Type your email" />
          </Form.Item>
          <Form.Item label="Password: ">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Comfirm Password: ">
            <Input.Password />
          </Form.Item>
          <Select
            label="Gender:"
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form>
      </div>
    </Space>
  );
};

export default Form_custom;
