import React from "react";
import { Form, Input, Button, message } from "antd";
import { savePhotosToStorage } from "../../../store";

const AddPhotoComponents = ({ onAdd, photos }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Adding new photo:", values);
    const newPhoto = {
      id: photos.length + 1,
      ...values,
    };

    onAdd(newPhoto);
    savePhotosToStorage(newPhoto);
    form.resetFields();
    message.success("Thêm mới thành công!");
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
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
        <Button type="primary" htmlType="submit">
          Add Photo
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddPhotoComponents;
