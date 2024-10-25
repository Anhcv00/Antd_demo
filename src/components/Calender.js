import React from "react";
import Calendar from "antd/lib/calendar";

const Calender = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return <Calendar onPanelChange={onPanelChange} />;
};

export default Calender;
