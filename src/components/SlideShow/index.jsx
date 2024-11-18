import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./SlideShow.css";

const CustomPrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev" onClick={onClick}>
    <LeftOutlined />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    <RightOutlined />
  </div>
);

const SlideShow = ({ slides, autoplay = true }) => {
  return (
    <div className="carousel-container">
      <Carousel
        autoplay={autoplay}
        dotPosition="bottom"
        infinite={true}
        arrows
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideShow;
