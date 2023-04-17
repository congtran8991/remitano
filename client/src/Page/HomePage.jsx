import React from "react";
import Video from "../Component/HomePage/Video";
import Information from "../Component/HomePage/Information";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="list-video">
        <div className="row-video">
          <Video />
          <Information />
        </div>
        <div className="row-video">
          <Video />
          <Information />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
