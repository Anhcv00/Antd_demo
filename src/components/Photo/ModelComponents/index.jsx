import React from "react";
import { Modal } from "antd";
import EditPhoto from "../EditPhotoComponents";
import AddPhoto from "../AddPhotoComponents";

const ModelComponents = ({
  isEditing,
  open,
  onCancel,
  onAddPhoto,
  onUpdatePhoto,
  currentPhoto,
  photos,
}) => (
  <Modal
    title={isEditing ? "Edit Photo" : "Add Photo"}
    open={open}
    onCancel={onCancel}
    footer={null}>
    {isEditing ? (
      <EditPhoto
        currentPhoto={currentPhoto}
        onUpdate={onUpdatePhoto}
        onCancel={onCancel}
      />
    ) : (
      <AddPhoto onAdd={onAddPhoto} photos={photos} />
    )}
  </Modal>
);

export default ModelComponents;
