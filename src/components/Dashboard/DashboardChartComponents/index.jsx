import { React, useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { Bar } from "react-chartjs-2";
import { getRevenue } from "../../../services";

const DashboardChartComponents = () => {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Card style={{ width: 500, height: 250 }}>
        <Bar options={options} data={reveneuData} />
      </Card>
    </>
  );
};

export default DashboardChartComponents;
