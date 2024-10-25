import React from "react";
import SibarMenu from "./SibarMenu";
import Photos from "./Photos";

const index = () => {
  return (
    <div style={{ display: "flex", padding: "50px 0" }}>
      <SibarMenu />
      <Photos />
    </div>
  );
};

export default index;
