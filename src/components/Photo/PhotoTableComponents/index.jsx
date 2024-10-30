import React from "react";
import { Table, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PhotoTableComponents = ({
  data,
  columns,
  rowSelection,
  handleRowMouseEnter,
  handleRowMouseLeave,
  hoveredRowId,
}) => (
  <Table
    rowSelection={rowSelection}
    dataSource={data}
    columns={columns}
    rowKey="id"
    onRow={(record) => ({
      onMouseEnter: () => handleRowMouseEnter(record.id),
      onMouseLeave: handleRowMouseLeave,
    })}
    rowClassName={(record) => (hoveredRowId === record.id ? "hovered-row" : "")}
    pagination={{
      showSizeChanger: true,
      pageSizeOptions: ["10", "30", "50"],
    }}
  />
);

export default PhotoTableComponents;
