import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Input, Image } from "antd";
import styled from "styled-components";

const FormDetails = styled(Form)`
  padding: 24px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

const PhotoDetails = () => {
  const { state } = useLocation();
  const record = state?.record;
  console.log(record);

  if (!record) {
    return <div>Photos not found.</div>;
  }

  return (
    <FormDetails layout="vertical" style={{ width: 600, margin: "0 auto" }}>
      <h1>Photos for {record.id}</h1>

      <Form.Item label="Title">
        <Input value={record.title} disabled />
      </Form.Item>

      <Form.Item label="URL">
        <Input value={record.url} disabled />
      </Form.Item>

      <Form.Item label="Thumbnail">
        <Image src={record.thumbnailUrl} alt="thumbnail" width={150} />
      </Form.Item>

      <Form.Item>
        <Button style={{ width: 150 }} onClick={() => window.history.back()}>
          Back
        </Button>
      </Form.Item>
    </FormDetails>
  );
};

export default PhotoDetails;
