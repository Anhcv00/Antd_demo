import React from "react";
import "./MarbleRaceCard.css";
import { UserOutlined, EyeOutlined } from "@ant-design/icons";

const MarbleRaceCard = ({
  status,
  title,
  prize,
  description,
  views,
  participants,
  src,
}) => {
  return (
    <div className="marble-race-card">
      <div className="card-image-container">
        <img src={src} alt={title} className="card-image" />
        <div className={`status-label ${status.toLowerCase()}`}>{status}</div>
      </div>
      <div className="card-content">
        <div className="prize-info">
          <span role="img" aria-label="coin">
            🪙
          </span>{" "}
          {prize}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <div className="footer-item">
            <EyeOutlined /> {views}
          </div>
          <div className="footer-item">
            <UserOutlined /> {participants}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarbleRaceCard;
