import React, { useRef } from "react";
import ReactPlayer from "react-player";

const Video = (props) => {
  const { url } = props;
  const playerRef = useRef(null);
  return (
    <div className="video">
      <ReactPlayer
        style={{
          maxWidth: "600px",
          minWidth: "450px",
          maxHeight: "300px",
          minHeight: "250px",
        }}
        width={"100%"}
        height={"300px"}
        url={url}
        ref={playerRef}
      />
    </div>
  );
};

export default Video;
