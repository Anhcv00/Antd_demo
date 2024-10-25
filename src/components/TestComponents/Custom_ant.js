import { Button, DatePicker, Progress, Slider, Space, Spin } from "antd";
import Input from "antd/es/input/Input";
import React from "react";

const Custom_ant = () => {
  return (
    <div>
      <Space direction="vertical">
        <Button type="primary">Button</Button>
        <Input placeholder="Type here ..." />
        <Progress percent={50} type="circle" />
        <Spin spinning />
        <DatePicker />
        <Slider />
      </Space>
    </div>
  );
};

export default Custom_ant;
