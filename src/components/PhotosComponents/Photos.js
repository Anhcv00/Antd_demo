import React, { useEffect, useState, useCallback, useMemo } from "react";
import { fetchPhotos } from "../../services/photo.js";
import { Table, Modal, Image } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloudDownloadOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  UploadOutlined,
  FallOutlined,
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
import { ButtonWrapper, TableWrapper } from "../StyleComponents/index.js";
import { useNavigate } from "react-router-dom";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [hoveredRowId, setHoveredRowId] = useState(null);
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const navigate = useNavigate();

  const fetchAndStorePhotos = async () => {
    try {
      const storedPhotos = getPhotosFromStorage();
      if (storedPhotos?.length > 0) {
        setPhotos(storedPhotos);
      } else {
        const data = await fetchPhotos();
        if (Array.isArray(data)) {
          setPhotos(data);
          savePhotosToStorage(data);
        } else {
          setPhotos([]);
        }
      }
    } catch (err) {
      console.error("Error fetching photos:", err);
      setPhotos([]);
    }
  };

  useEffect(() => {
    fetchAndStorePhotos();
  }, []);

  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) =>
        photo.title.toLowerCase().includes(searchPhoto.toLowerCase())
      ),
    [photos, searchPhoto]
  );

  const columns = useMemo(
    () => [
      {
        title: "ID",
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
        render: (_, record) => (
          <div
            style={{ display: hoveredRowId === record.id ? "flex" : "none" }}>
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
    ],
    [hoveredRowId]
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const openModal = useCallback((photo = null) => {
    setIsEditing(!!photo);
    setCurrentPhoto(photo);
    setOpenEdit(true);
  }, []);

  const showModelEditPhoto = (photo) => openModal(photo);

  const addPhoto = useCallback(
    (newPhoto) => {
      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      savePhotosToStorage(updatedPhotos);
      setOpenEdit(false);
    },
    [photos]
  );

  const updatePhoto = (updatedPhoto) => {
    if (Array.isArray(photos)) {
      const updatedPhotos = photos.map((photo) =>
        photo.id === updatedPhoto.id ? updatedPhoto : photo
      );
      setPhotos(updatedPhotos);
      updatePhotoInStorage(updatedPhotos);
    } else {
      console.error("Photos is not an array");
    }
  };

  const handleDelete = useCallback(
    (photoId) => {
      const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
      setPhotos(updatedPhotos);
      deletePhotoFromStorage(photoId);
    },
    [photos]
  );

  const handleRowMouseEnter = useCallback((id) => setHoveredRowId(id), []);
  const handleRowMouseLeave = useCallback(() => setHoveredRowId(null), []);

  const handleInputChange = (event) => setSearchPhoto(event.target.value);

  const showModalDelete = (photoId) => {
    setPhotoIdToDelete(photoId);
    setOpenDelete(true);
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    handleDelete(photoIdToDelete);
    setOpenDelete(false);
    setConfirmLoading(false);
    setModalText("Are you sure you want to delete this photo?");
    setPhotoIdToDelete(null);
  };

  const handleCancel = () => setOpenDelete(false);
  const handleCancelEdit = () => setOpenEdit(false);

  const handleRowClick = useCallback(
    (record) => navigate(`/photos/${record.id}`, { state: { record } }),
    [navigate]
  );

  return (
    <div className="photo-content">
      <PhotoSearch
        value={searchPhoto}
        placeholder="Search by Title Photos..."
        onChange={handleInputChange}
      />

      <div className="table-actions">
        <div className="icon-actions">
          <span>Danh sách : {photos.length}</span>
          <div className="icon-action">
            <AreaChartOutlined />
            <PieChartOutlined />
            <UploadOutlined />
            <EditOutlined />
            <FallOutlined />
          </div>
        </div>
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
        rowSelection={rowSelection}
        dataSource={filteredPhotos}
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
