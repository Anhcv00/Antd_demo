import React from "react";
import MarbleRaceCard from "../../components/MarbleRaceCard";
import MarbleRaceCard_Item_1 from "../../assets/img/MarbleRaceCard_Item_1.png";
import MarbleRaceCard_Item_2 from "../../assets/img/MarbleRaceCard_Item_2.png";
import MarbleRaceCard_Item_3 from "../../assets/img/MarbleRaceCard_Item_3.png";
const VideoManagementComponents = () => {
  const cardData = [
    {
      id: 1,
      status: "WAITING",
      title: "Legends of the Marble Speedway",
      prize: "1000~1,000,000",
      description: "Eligibility Criteria lorem ipsum dolor sit amet...",
      views: 8,
      participants: 1200,
      src: MarbleRaceCard_Item_1,
    },
    {
      id: 2,
      status: "WAITING",
      title: "Speedway Showdown",
      prize: "1000~1,000,000",
      description: "Eligibility Criteria lorem ipsum dolor sit amet...",
      views: 8,
      participants: 1200,
      src: MarbleRaceCard_Item_2,
    },
    {
      id: 3,
      status: "PLAYING",
      title: "Champions of the Rolling Thunder",
      prize: "1000~1,000,000",
      description: "Eligibility Criteria lorem ipsum dolor sit amet...",
      views: 8,
      participants: 1200,
      src: MarbleRaceCard_Item_3,
    },
    {
      id: 4,
      status: "PLAYING",
      title: "Champions of the Rolling Thunder",
      prize: "1000~1,000,000",
      description: "Eligibility Criteria lorem ipsum dolor sit amet...",
      views: 8,
      participants: 1200,
      src: MarbleRaceCard_Item_3,
    },
    {
      id: 5,
      status: "PLAYING",
      title: "Champions of the Rolling Thunder",
      prize: "1000~1,000,000",
      description: "Eligibility Criteria lorem ipsum dolor sit amet...",
      views: 8,
      participants: 1200,
      src: MarbleRaceCard_Item_3,
    },
    {
      id: 6,
      status: "PLAYING",
      title: "Champions of the Rolling Thunder",
      prize: "1000~1,000,000",
      description: "Eligibility Criteria lorem ipsum dolor sit amet...",
      views: 8,
      participants: 1200,
      src: MarbleRaceCard_Item_3,
    },
  ];
  return (
    <div className="marble-race-page">
      {cardData.map((data) => (
        <MarbleRaceCard key={data.id} {...data} />
      ))}
    </div>
  );
};

export default VideoManagementComponents;
