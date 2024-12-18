import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Input, Image } from "antd";
import { FormDetails } from "../../Style";
const PhotoDetailsComponents = () => {
  const { state } = useLocation();
  const record = state?.record;

  if (!record) {
    return <div>Photos not found.</div>;
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="photo-details">
          <div className="photo-details-content">
            <FormDetails layout="vertical">
              <h1>Photos for {record.id}</h1>

              <Form.Item label="Title">
                <Input value={record.title} readOnly />
              </Form.Item>

              <Form.Item label="URL">
                <Input value={record.url} readOnly />
              </Form.Item>

              <Form.Item label="Thumbnail">
                <Image src={record.thumbnailUrl} alt="thumbnail" width={150} />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: 150 }}
                  onClick={() => window.history.back()}>
                  Back
                </Button>
              </Form.Item>
            </FormDetails>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhotoDetailsComponents;
