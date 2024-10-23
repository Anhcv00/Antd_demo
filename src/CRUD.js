import { Form, Input, Button, Alert, Table } from "antd";
import React, { useState } from "react";

const CRUD = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const ageFilterOptions = [
    { text: "10-20", value: "10-20" },
    { text: "20-30", value: "20-30" },
    { text: ">30", value: ">30" },
  ];

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John",
      age: 25,
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Sarah",
      age: 22,
      email: "sarah@example.com",
    },
    {
      id: 3,
      name: "David",
      age: 30,
      email: "david@example.com",
    },
    {
      id: 4,
      name: "Emily",
      age: 28,
      email: "emily@example.com",
    },
    {
      id: 5,
      name: "Michael",
      age: 35,
      email: "michael@example.com",
    },
    {
      id: 6,
      name: "Emma",
      age: 27,
      email: "emma@example.com",
    },
    {
      id: 7,
      name: "Daniel",
      age: 26,
      email: "daniel@example.com",
    },
    {
      id: 8,
      name: "Sophia",
      age: 24,
      email: "sophia@example.com",
    },
    {
      id: 9,
      name: "James",
      age: 31,
      email: "james@example.com",
    },
    {
      id: 10,
      name: "Olivia",
      age: 29,
      email: "olivia@example.com",
    },
    {
      id: 11,
      name: "Henry",
      age: 32,
      email: "henry@example.com",
    },
  ]);

  const columns = [
    { key: "1", title: "ID", dataIndex: "id", sorter: (a, b) => a.id - b.id },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: "3",
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      filters: ageFilterOptions,
      onFilter: (value, record) => {
        if (value === "10-20") {
          return record.age >= 10 && record.age <= 20;
        } else if (value === "20-30") {
          return record.age > 20 && record.age <= 30;
        } else if (value === ">30") {
          return record.age > 30;
        }
        return false;
      },
    },
    { key: "4", title: "Email", dataIndex: "email" },
    {
      key: "5",
      title: "Action",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              setEditingStudent(record);
              setIsEditing(true);
            }}>
            Update
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="danger">
            Delete
          </Button>
        </>
      ),
    },
  ];

  const onFinish = (values) => {
    const newStudent = {
      id: students.length + 1,
      name: values.name,
      age: parseInt(values.age),
      email: values.email,
    };
    setStudents([...students, newStudent]);
    setIsAdding(false);
  };

  const onFinishUpdate = (values) => {
    const updatedStudents = students.map((student) =>
      student.id === editingStudent.id
        ? {
            ...student,
            name: values.name,
            age: values.age,
            email: values.email,
          }
        : student
    );

    setStudents(updatedStudents);
    setIsEditing(false);
    setEditingStudent(null);
  };

  const handleDelete = (id) => {
    alert("Are you sure you want to delete this student?");
    const filteredStudents = students.filter((student) => student.id !== id);
    setStudents(filteredStudents);
  };

  return (
    <div className="Form_CRUD">
      {!isAdding && !isEditing && (
        <Button style={{ marginBottom: 24 }} onClick={() => setIsAdding(true)}>
          Add a new student
        </Button>
      )}

      {(isAdding || isEditing) && (
        <div className="form_add" style={{ width: 400, margin: `0 auto` }}>
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

          <Form
            onFinish={isEditing ? onFinishUpdate : onFinish}
            initialValues={isEditing ? editingStudent : {}}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="Họ tên"
              name="name"
              rules={[{ required: true, message: "Nhập tên.... !" }]}>
              <Input placeholder="Nhập họ tên..." />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="Email"
              name="email"
              rules={[{ required: true, message: "Nhập email.... !" }]}>
              <Input placeholder="Nhập email..." />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="Age"
              name="age"
              rules={[{ required: true, message: "Nhập tuổi.... !" }]}>
              <Input placeholder="Nhập tuổi..." type="number" />
            </Form.Item>

            <Button htmlType="submit" type="primary" block>
              {isEditing ? "Cập nhật" : "Thêm mới"}
            </Button>

            <Button
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
                setEditingStudent(null);
              }}
              type="default"
              block>
              Cancel
            </Button>
          </Form>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={students}
        pagination={{
          current: page,
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["3", "5", "10"],
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};
export default CRUD;
