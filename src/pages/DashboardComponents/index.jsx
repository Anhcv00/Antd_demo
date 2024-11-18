import { React, useEffect, useState } from "react";
import { Col, Row, Space, Typography } from "antd";
import {
  MyChartComponents,
  DashboardCardComponents,
  RecentOrdersComponents,
  DashboardChartComponents,
} from "../../components/Dashboard";
import { getOrders, getInventory, getCustomers } from "../../services";
import {
  ShoppingCartOutlined,
  UserOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { StyledIcon } from "../../components/Style";

const DashboardComponents = () => {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales 2022 (in USD)",
        data: [250, 400, 300, 350, 550, 650, 450],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Sales 2023 (in USD)",
        data: [300, 500, 200, 400, 600, 700, 500],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Sales 2024 (in USD)",
        data: [350, 600, 250, 450, 650, 750, 550],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Sales Data" },
    },
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal">
              <DashboardCardComponents
                icon={
                  <StyledIcon
                    color="green"
                    backgroundColor="rgba(0,255,0,0.25)">
                    <ShoppingCartOutlined />
                  </StyledIcon>
                }
                title={"Orders"}
                value={orders}
              />
              <DashboardCardComponents
                icon={
                  <StyledIcon color="blue" backgroundColor="rgba(0,0,255,0.25)">
                    <ShoppingOutlined />
                  </StyledIcon>
                }
                title={"Inventory"}
                values={inventory}
              />
              <DashboardCardComponents
                icon={
                  <StyledIcon
                    color="purple"
                    backgroundColor="rgba(0,255,255,0.25)">
                    <UserOutlined />
                  </StyledIcon>
                }
                title={"Customer"}
                value={customers}
              />
              <DashboardCardComponents
                icon={
                  <StyledIcon color="red" backgroundColor="rgba(255,0,0,0.25)">
                    <DollarCircleOutlined />
                  </StyledIcon>
                }
                title={"Revenue"}
                value={revenue}
              />
            </Space>
            <Space>
              <RecentOrdersComponents />
              <DashboardChartComponents />
            </Space>
          </Space>
        </Col>
        <Col span={12}>
          <MyChartComponents data={data} options={options} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardComponents;
