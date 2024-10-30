import React from "react";
import { Modal } from "antd";

const DeletePhotoComponents = ({
  open,
  onOk,
  confirmLoading,
  onCancel,
  modalText,
}) => (
  <Modal
    open={open}
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}>
    <p>{modalText}</p>
  </Modal>
);

export default DeletePhotoComponents;
