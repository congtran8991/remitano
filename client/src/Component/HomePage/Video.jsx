import React, { useRef } from "react";
import ReactPlayer from "react-player";

const Video = () => {
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
        url="http://www.youtube.com/watch?v=cPqG8-NoxM0&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH&index=32"
        ref={playerRef}
      />
    </div>
  );
};

export default Video;
