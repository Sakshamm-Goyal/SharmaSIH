import React, { useState, useEffect } from 'react';
import { FaPhone, FaVrCardboard } from 'react-icons/fa'; // Import icons
import VideoComponent from './VideoComponent'; // Import the video component

const VrPopup = ({ onClose, onShowVideo }) => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      setConnected(true);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (connected) {
      const successTimer = setTimeout(() => {
        onShowVideo(); // Notify parent to show video
      }, 2000);

      return () => clearTimeout(successTimer);
    }
  }, [connected, onShowVideo]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80 flex items-center justify-center z-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-4/5 max-w-md h-[40vh] relative flex flex-col">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {connected ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              SEARCHING FOR VR DEVICE...
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please ensure that your iPhone/Quest is logged in with the same device.
            </p>
            <p className="text-green-500 dark:text-green-400 text-center mb-4">
              Device connected successfully
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              SEARCHING FOR VR DEVICE...
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please ensure that your iPhone/Quest is logged in with the same device.
            </p>
            <div className="flex-grow"></div>
            {loading ? (
              <div className="flex justify-center items-center mb-4">
                <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default VrPopup;
