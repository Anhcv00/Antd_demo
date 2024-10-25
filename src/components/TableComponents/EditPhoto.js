import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";

const EditPhoto = ({ currentPhoto, onUpdate, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentPhoto);
  }, [currentPhoto, form]);

  const onFinish = (values) => {
    setTimeout(() => {
      const updatedPhoto = { ...currentPhoto, ...values };
      onUpdate(updatedPhoto);
      onCancel();
    }, 1000);
    message.success("Cập nhật thành công!");
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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
          Update Photo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPhoto;
