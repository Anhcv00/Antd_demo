import React from "react";
import { Card, Space, Statistic } from "antd";

const DashboardCardComponents = ({ title, values, icon }) => {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic
          style={{ textAlign: "center" }}
          title={title}
          value={values}
        />
      </Space>
    </Card>
  );
};

export default DashboardCardComponents;
