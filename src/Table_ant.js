import React from "react";
import { Table } from "antd";

const Table_ant = () => {
  const data = [
    {
      name: "Name 1",
      age: 32,
      address: "New York No. 1 Lake Park",
      key: "1",
    },
    {
      name: "Name 2",
      age: 24,
      address: "New York No. 1 Lake Park",
      key: "2",
    },
    {
      name: "Name 2",
      age: 18,
      address: "New York No. 1 Lake Park",
      key: "3",
    },
  ];
  const colums = [
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
      render: (name) => {
        return <a>{name}</a>;
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "key",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Adress",
      dataIndex: "address",
      key: "key",
    },
    {
      title: "Gratueds",
      key: "key",
      render: (payload) => {
        return <p>{payload.age > 20 ? "true" : "false"}</p>;
      },
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={colums}
      pagination={{ pageSize: 2 }}></Table>
  );
};

export default Table_ant;
