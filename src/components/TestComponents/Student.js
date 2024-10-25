import { Table, Tag } from "antd";
import React, { useState } from "react";

const Student = () => {
  const [alreadySelectedRows, setAlreadySelectedRows] = useState(["1", "3"]);

  const colums = [
    {
      title: "Student ID",
      dataIndex: "id",
      sorter: (a, b) => {
        return a.id - b.id;
      },
    },
    {
      title: "Student Name",
      dataIndex: "name",
    },
    {
      title: "Student Grade",
      dataIndex: "grade",
      render: (tag) => {
        if (tag >= 100) {
          return <Tag style={{ backgroundColor: "yellow" }}>{tag}</Tag>;
        } else if (tag >= 90) {
          return <Tag style={{ backgroundColor: "green" }}>{tag}</Tag>;
        } else if (tag >= 80) {
          return <Tag style={{ backgroundColor: "orange" }}>{tag}</Tag>;
        } else {
          return <Tag style={{ backgroundColor: "red" }}>{tag}</Tag>;
        }
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "John Doe",
      grade: 100,
    },
    {
      key: "2",
      id: 2,
      name: "Nathan Doe",
      grade: 95,
    },
    {
      key: "3",
      id: 3,
      name: "Alert Name",
      grade: 100,
    },
    {
      key: "4",
      id: 4,
      name: "John Doe",
      grade: 90,
    },
    {
      key: "5",
      id: 5,
      name: "John Doe",
      grade: 80,
    },
  ];
  return (
    <div>
      <Table
        columns={colums}
        dataSource={dataSource}
        rowSelection={{
          selectedRowKeys: alreadySelectedRows,
          onChange: (keys) => {
            setAlreadySelectedRows(keys);
          },
          type: "checkbox",
          onSelect: (record) => {
            console.log("selected", record);
          },
          selections: [
            Table.SELECTION_NONE,
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
              key: "excellent",
              text: "Select Student with Excellent Grade",
              onSelect: (allKeys) => {
                const selectKeys = allKeys.filter((key) => {
                  const isExcellent = dataSource.find((student) => {
                    return student.key === key && student.grade >= 90;
                  });
                  return isExcellent ? key : undefined;
                });
                setAlreadySelectedRows(selectKeys);
              },
            },
          ],
        }}></Table>
    </div>
  );
};

export default Student;
