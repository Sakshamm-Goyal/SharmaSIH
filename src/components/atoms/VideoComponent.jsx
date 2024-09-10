import React from 'react';
import video from "../../assets/vrvid/vrlab.mp4"

const VideoComponent = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <video
        src={video}
        autoPlay
        className="w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoComponent;
