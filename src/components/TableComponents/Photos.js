import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../../services/photo.js";
import { Button, Input, Modal, Form, Image } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import EditPhoto from "./EditPhoto.js";
import AddPhoto from "./AddPhoto.js";
import PhotoSearch from "./PhotoSearch.js";
import {
  getPhotosFromStorage,
  savePhotosToStorage,
  deletePhotoFromStorage,
  updatePhotoInStorage,
} from "../../store/store.js";
import { ButtonWrapper, TableWrapper } from "./style.js";

import { useNavigate } from "react-router-dom";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
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

  useEffect(() => {
    console.log("Current photo updated:", currentPhoto);
  }, [currentPhoto]);

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
    if (photo) {
      setIsEditing(true);
      setCurrentPhoto(photo);
    } else {
      setIsEditing(false);
      setCurrentPhoto(null);
    }
    setOpenEdit(true);
  };

  const showModelEditPhoto = (photo) => {
    console.log(photo);

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
  };
  const handleRowClick = (record) => {
    navigate(`/photos/${record.id}`, { state: { record } });
  };

  return (
    <div className="photo-content">
      <PhotoSearch
        value={searchPhoto}
        placeholder="Search by Title Photos..."
        onChange={handleInputChange}
        onSearch={handleSearch}
      />

      <div className="table-actions">
        <h2>Danh sách : {photos.length} </h2>

        <div className="button-actions">
          <ButtonWrapper type="default">
            <CloudDownloadOutlined /> Download
          </ButtonWrapper>
          <ButtonWrapper type="primary" onClick={() => openModal()}>
            <PlusOutlined /> New Photo
          </ButtonWrapper>
        </div>
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
        {isEditing ? (
          <EditPhoto
            currentPhoto={currentPhoto}
            onUpdate={updatePhoto}
            onCancel={handleCancelEdit}
          />
        ) : (
          <AddPhoto onAdd={addPhoto} photos={photos} />
        )}
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
          showSizeChanger: true,
          pageSizeOptions: ["10", "30", "50"],
        }}
      />
    </div>
  );
};

export default Photos;

// const handleRowMouseEnter = (id) => {
//   setHoveredRowId(id);
// };

// const handleRowMouseLeave = () => {
//   setHoveredRowId(null);
// };
