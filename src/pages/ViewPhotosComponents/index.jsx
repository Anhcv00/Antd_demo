import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPhotos } from "../../services";
import { Table, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getPhotosFromStorage,
  savePhotosToStorage,
  deletePhotoFromStorage,
  updatePhotoInStorage,
} from "../../store";
import {
  PhotoSearchComponents,
  TableActionComponents,
  DeletePhotoComponents,
  ModelComponents,
  PhotoTableComponents,
} from "../../components/Photo";

const ViewPhotosComponents = () => {
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
  const onAddPhoto = useCallback(() => {
    setIsEditing(false);
    setCurrentPhoto(null);
    setOpenEdit(true);
  }, []);

  const handleRowClick = useCallback(
    (record) => navigate(`/photos/${record.id}`, { state: { record } }),
    [navigate]
  );

  return (
    <>
      <PhotoSearchComponents
        value={searchPhoto}
        placeholder="Search by Title Photos..."
        onChange={handleInputChange}
      />
      <TableActionComponents
        onAddPhoto={onAddPhoto}
        totalPhotos={photos.length}
      />

      <DeletePhotoComponents
        open={openDelete}
        onOk={() => {
          setConfirmLoading(true);
          handleDelete(photoIdToDelete);
          setOpenDelete(false);
          setConfirmLoading(false);
        }}
        confirmLoading={confirmLoading}
        onCancel={() => setOpenDelete(false)}
        modalText={modalText}
      />

      <ModelComponents
        isEditing={isEditing}
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        onAddPhoto={addPhoto}
        onUpdatePhoto={updatePhoto}
        currentPhoto={currentPhoto}
        photos={photos}
      />

      <PhotoTableComponents
        data={filteredPhotos}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        handleRowMouseEnter={handleRowMouseEnter}
        handleRowMouseLeave={handleRowMouseLeave}
        hoveredRowId={hoveredRowId}
      />
    </>
  );
};

export default ViewPhotosComponents;
