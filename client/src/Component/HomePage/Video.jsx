import React, { useRef } from "react";
import ReactPlayer from "react-player";

const Video = (props) => {
  const { url } = props;
  const playerRef = useRef(null);
  return (
    <div className="video">
      <ReactPlayer
        controls
        style={{
          maxWidth: "37rem",
          minWidth: "20rem",
          maxHeight: "14.5rem",
          minHeight: "2.5rem",
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
