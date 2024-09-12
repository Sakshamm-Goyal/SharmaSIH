import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import videos directly
import elecVideo from '../../assets/vrvid/elec.mp4';
import litmusVideo from '../../assets/vrvid/vrlab.mp4';

const VideoComponent = () => {
  const { topicName } = useParams(); // Extract the `topicName` from the route
  const [videoSrc, setVideoSrc] = useState(''); // State to store the video source path

  useEffect(() => {
    // Fetch data from JSON file
    fetch('/data.json') // Adjust the path to where your JSON file is located
      .then((response) => response.json())
      .then((data) => {
        // Find the video file path for the given `topicName`
        const videoData = data.find((item) => item.id === topicName);
        if (videoData) {
          console.log(`Video data found for topic "${topicName}":`, videoData); // Log the video data
          switch (videoData.vr) {
            case 'elec.mp4':
              setVideoSrc(elecVideo);
              break;
            case 'litmus.mp4':
              setVideoSrc(litmusVideo);
              break;
            default:
              console.error(`No video found for: ${videoData.vr}`);
          }
        } else {
          console.error(`No video data found for topic: ${topicName}`);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [topicName]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoComponent;
