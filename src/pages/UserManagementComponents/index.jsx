import React from "react";
import SlideShow from "../../components/SlideShow";
import haloween_1 from "../../assets/img/halloween-1.jpg";
import haloween_2 from "../../assets/img/halloween-2.jpg";
import haloween_3 from "../../assets/img/halloween-3.jpg";
import haloween_4 from "../../assets/img/halloween-4.jpg";
import haloween_5 from "../../assets/img/halloween-5.jpg";
const UserManagementComponents = () => {
  const slides = [haloween_1, haloween_2, haloween_3, haloween_4, haloween_5];
  return (
    <div>
      <h1>Slide Show </h1>
      <SlideShow slides={slides} autoplay={true} />
    </div>
  );
};

export default UserManagementComponents;
