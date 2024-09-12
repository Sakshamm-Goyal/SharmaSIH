import React, { useState } from 'react';
import VrPopup from './VrPopup'; // Import the VR popup component
import VideoComponent from './VideoComponent'; // Import the video component

const ParentComponent = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  return (
    <div>
      {showPopup && (
        <VrPopup
          onClose={handleClosePopup}
          onShowVideo={handleShowVideo}
        />
      )}
      {showVideo && (
        <div className="fixed inset-0 z-50">
          <VideoComponent />
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
