import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../services/photo.js";
import { Table, Button, Input, Modal, Form, Image } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import {
  getPhotosFromStorage,
  savePhotosToStorage,
  deletePhotoFromStorage,
  updatePhotoInStorage,
} from "./store.js";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = styled(Button)`
  width: 200px;
  height: 40px;
  &:hover {
    background-color: #11221f;
    color: #fff;
  }
  transition: background-color 0.3s ease;
`;

const TableWrapper = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f0f0f0 !important;
    color: #333 !important;
    font-weight: bold !important;
    text-align: center;
    background-color: #fff3cf !important;
    border-right: 1px solid #ddd;
    &:hover {
      cursor: pointer;
      color: red !important;
    }
    &:nth-last-child(2) {
      border: none;
    }
  }
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  .ant-table-pagination {
    padding: 10px !important;
  }
`;

const InputSearch = styled(Input)`
  width: 300px;
`;

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [searchPhoto, setSearchPhoto] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [photoIdToDelete, setPhotoIdToDelete] = useState(null);
  const [modalText, setModalText] = useState(
    "Are you sure you want to delete this photo?"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndStorePhotos = async () => {
      try {
        const storedPhotos = getPhotosFromStorage();
        if (storedPhotos.length > 0) {
          setPhotos(storedPhotos);
        } else {
          const data = await fetchPhotos();
          setPhotos(data);
          savePhotosToStorage(data);
        }
      } catch (err) {
        console.error("Error fetching photos:", err);
      }
    };

    fetchAndStorePhotos();
  }, []);

  const columns = [
    {
      title: "ID",
      rowClassName: "row-header",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <span onClick={() => handleRowClick(record)}>{text}</span>
      ),
    },

    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "ThumbnailUrl",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (thumbnailUrl) => (
        <Image src={thumbnailUrl} alt="thumbnail" width="100" />
      ),
    },
    {
      key: "actions",
      title: "",
      width: 100,
      render: (text, record) => (
        <div style={{ display: hoveredRowId === record.id ? "flex" : "none" }}>
          <EditOutlined
            onClick={() => showModelEditPhoto(record)}
            style={{ marginRight: 24, color: "#08c", cursor: "pointer" }}
          />
          <DeleteOutlined
            onClick={() => showModalDelete(record.id)}
            style={{ color: "#ff4d4f", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const openModal = (photo = null) => {
    setIsEditing(!!photo);
    setCurrentPhoto(photo);
    if (!photo) {
      form.resetFields();
    }
    setOpenEdit(true);
  };

  const showModelEditPhoto = (photo) => {
    openModal(photo);
  };

  // Hàm để thêm photo mới
  const addPhoto = (newPhoto) => {
    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    savePhotosToStorage(updatedPhotos);
  };

  // Hàm để cập nhật photo
  const updatePhoto = (updatedPhoto) => {
    const updatedPhotos = photos.map((photo) =>
      photo.id === updatedPhoto.id ? updatedPhoto : photo
    );
    setPhotos(updatedPhotos);
    updatePhotoInStorage(updatedPhoto);
  };

  // Hàm để xóa photo
  const handleDelete = (photoId) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(updatedPhotos);
    deletePhotoFromStorage(photoId);
  };

  const handleRowMouseEnter = (id) => {
    setHoveredRowId(id);
  };

  const handleRowMouseLeave = () => {
    setHoveredRowId(null);
  };
  // Search
  const handleInputChange = (event) => {
    setSearchPhoto(event.target.value);
  };

  const handleSearch = () => {
    const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(searchPhoto.toLowerCase())
    );
    setFilteredPhotos(filtered);
  };

  const showModalDelete = (photoId) => {
    setPhotoIdToDelete(photoId);
    setOpenDelete(true);
  };

  // Delete
  const handleOkDelete = () => {
    setModalText("Deleted photo successfully!");
    setConfirmLoading(true);
    setTimeout(() => {
      if (photoIdToDelete !== null) {
        handleDelete(photoIdToDelete);
      }
      setOpenDelete(false);
      setConfirmLoading(false);
      setModalText("Are you sure you want to delete this photo?");
      setPhotoIdToDelete(null);
    }, 2000);
  };

  const handleCancel = () => {
    setOpenDelete(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
    setCurrentPhoto(null);
    setIsEditing(false);
    form.resetFields();
  };

  const handleOkEdit = (values) => {
    setConfirmLoading(true);
    setTimeout(() => {
      if (isEditing) {
        // Edit
        const updatedPhoto = { ...currentPhoto, ...values };
        updatePhoto(updatedPhoto);
      } else {
        // Add
        const newPhoto = {
          id: photos.length + 1, // Tăng ID
          ...values,
        };
        addPhoto(newPhoto);
      }
      setOpenEdit(false);
      setConfirmLoading(false);
      setCurrentPhoto(null);
      form.resetFields();
    }, 2000);
  };

  const handleRowClick = (record) => {
    navigate(`/photos/${record.id}`, { state: { record } });
  };

  return (
    <div>
      <h1>Photos Operations</h1>
      <div className="table-actions">
        <ButtonWrapper type="primary" onClick={() => openModal()}>
          Add Photo
        </ButtonWrapper>
        <InputSearch
          value={searchPhoto}
          placeholder="Search by Title Photos..."
          onChange={handleInputChange}
          suffix={
            <SearchOutlined
              onClick={handleSearch}
              style={{ color: "rgba(0,0,0,.45)" }}
            />
          }
        />
      </div>

      <Modal
        open={openDelete}
        onOk={handleOkDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>

      <Modal
        title={isEditing ? "Edit Photo" : "Add Photo"}
        open={openEdit}
        onCancel={handleCancelEdit}
        footer={null}>
        <Form
          form={form}
          layout="vertical"
          initialValues={currentPhoto}
          onFinish={handleOkEdit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: "Please input the URL!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="thumbnailUrl"
            label="Thumbnail URL"
            rules={[
              { required: true, message: "Please input the thumbnail URL!" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <TableWrapper
        dataSource={filteredPhotos.length > 0 ? filteredPhotos : photos}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onMouseEnter: () => handleRowMouseEnter(record.id),
          onMouseLeave: handleRowMouseLeave,
        })}
        rowClassName={(record) =>
          hoveredRowId === record.id ? "hovered-row" : ""
        }
        pagination={{
          current: page,
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "30", "50"],
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default Photos;
