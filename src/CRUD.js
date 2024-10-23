import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Alert,
  Table,
  Modal,
  Divider,
  Checkbox,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const CRUD = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [form] = Form.useForm();

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
      description: "John is a 25-year-old man.",
    },
    {
      id: 2,
      name: "Sarah",
      age: 22,
      email: "sarah@example.com",
      description: "Sarah is a 22-year-old woman.",
    },
    {
      id: 3,
      name: "David",
      age: 30,
      email: "david@example.com",
      description: "David is a 30-year-old man.",
    },
    {
      id: 4,
      name: "Emily",
      age: 28,
      email: "emily@example.com",
      description: "Emily is a 28-year-old woman.",
    },
    {
      id: 5,
      name: "Michael",
      age: 35,
      email: "michael@example.com",
      description: "Michael is a 35-year-old man.",
    },
    {
      id: 6,
      name: "Emma",
      age: 27,
      email: "emma@example.com",
      description: "Emma is a 27-year-old woman.",
    },
    {
      id: 7,
      name: "Daniel",
      age: 26,
      email: "daniel@example.com",
      description: "Daniel is a 26-year-old man.",
    },
    {
      id: 8,
      name: "Sophia",
      age: 24,
      email: "sophia@example.com",
      description: "Sophia is a 24-year-old woman.",
    },
    {
      id: 9,
      name: "James",
      age: 31,
      email: "james@example.com",
      description: "James is a 31-year-old man.",
    },
    {
      id: 10,
      name: "Olivia",
      age: 29,
      email: "olivia@example.com",
      description: "Olivia is a 29-year-old woman.",
    },
    {
      id: 11,
      name: "Henry",
      age: 32,
      email: "henry@example.com",
      description: "Henry is a 32-year-old man.",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    // Table.EXPAND_COLUMN,
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      width: 200,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search by name"
              value={selectedKeys}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              icon={<SearchOutlined />}
              onClick={() => {
                confirm();
              }}
              color="primary"
              variant="solid">
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              variant="solid"
              color="danger">
              Reset
            </Button>
            <Button
              style={{
                flex: "right",
              }}
              variant="solid"
              color="danger"
              onClick={() => {
                close();
              }}>
              close
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: "3",
      title: "Age",
      dataIndex: "age",
      width: 150,
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
    { key: "4", title: "Email", dataIndex: "email", width: 300 },
    {
      key: "5",
      title: "",
      width: 100,
      render: (text, record) => (
        <div style={{ display: hoveredRowId === record.id ? "flex" : "none" }}>
          <EditOutlined
            onClick={() => openModal(record)}
            style={{ marginRight: 8, color: "#08c", cursor: "pointer" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record.id)}
            style={{ color: "#ff4d4f", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const openModal = (student) => {
    if (student) {
      setEditingStudent(student);
      setIsEditing(true);
      form.setFieldsValue(student);
    } else {
      setEditingStudent(null);
      setIsEditing(false);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => form.resetFields(), 200);
  };

  const onFinish = (values) => {
    const newStudent = {
      id: students.length + 1,
      name: values.name,
      age: parseInt(values.age),
      email: values.email,
      description: values.description,
    };
    setStudents([...students, newStudent]);
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinishUpdate = (values) => {
    const updatedStudents = students.map((student) =>
      student.id === editingStudent.id
        ? {
            ...student,
            name: values.name,
            age: values.age,
            email: values.email,
            description: values.description,
          }
        : student
    );
    setStudents(updatedStudents);
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có muốn xóa học sinh này không?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };
  const handleRowMouseEnter = (id) => {
    setHoveredRowId(id);
  };

  const handleRowMouseLeave = () => {
    setHoveredRowId(null);
  };

  const defaultCheckedList = columns.map((item) => item.key);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = columns
    .filter(({ key }) => key !== "5")
    .map(({ key, title }) => ({
      label: title,
      value: key,
    }));

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  return (
    <div className="Form_CRUD" style={{ width: 1000 }}>
      <Button style={{ marginBottom: 24 }} onClick={() => openModal()}>
        Thêm học sinh mới
      </Button>

      <Modal
        title={isEditing ? "Cập nhật học sinh" : "Thêm học sinh mới"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}>
        {showAlert && (
          <Alert
            type="error"
            message="Error"
            description="Có lỗi xảy ra trong quá trình xử lý"
            className="AlertAlert"
            onClose={() => setShowAlert(false)}
            closable
          />
        )}
        <Form
          form={form}
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
            htmlType="email"
            rules={[{ required: true, message: "Nhập email.... !" }]}>
            <Input placeholder="Nhập email..." />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Tuổi"
            name="age"
            rules={[{ required: true, message: "Nhập tuổi.... !" }]}>
            <Input placeholder="Nhập tuổi..." type="number" />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Description"
            name="description"
            htmlType="description"
            rules={[{ required: true, message: "Nhập mô tả.... !" }]}>
            <Input placeholder="Nhập mô tả..." />
          </Form.Item>

          <Button htmlType="submit" type="primary" block>
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Form>
      </Modal>

      <Divider>Options Show</Divider>
      <Checkbox.Group
        style={{
          marginBottom: 24,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
        value={checkedList}
        options={options}
        onChange={(value) => {
          setCheckedList(value);
        }}
      />

      <Table
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
        dataSource={students}
        columns={newColumns}
        rowKey="id"
        onRow={(record) => ({
          onMouseEnter: () => handleRowMouseEnter(record.id),
          onMouseLeave: handleRowMouseLeave,
        })}
        rowClassName={(record) =>
          hoveredRowId === record.id ? "hovered-row" : ""
        }
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
                padding: "0 16px",
              }}>
              {record.description}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
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
