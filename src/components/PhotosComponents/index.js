import React from "react";
import SibarMenu from "./SibarMenu";
import Photos from "./Photos";

const PhotosComponents = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-table d-flex">
          <SibarMenu />
          <Photos />
        </div>
      </div>
    </div>
  );
};

export default PhotosComponents;
