import React from "react";
import { ButtonWrapper } from "../../Style";
import {
  CloudDownloadOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  UploadOutlined,
  EditOutlined,
  FallOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const TableActionComponents = ({ onAddPhoto, totalPhotos }) => (
  <div className="table-actions">
    <div className="icon-actions">
      <span>Danh sách : {totalPhotos}</span>
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
      <ButtonWrapper type="primary" onClick={onAddPhoto}>
        <PlusOutlined /> New Photo
      </ButtonWrapper>
    </div>
  </div>
);

export default TableActionComponents;
