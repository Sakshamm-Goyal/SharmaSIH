import React, { useEffect } from 'react';
import badgeImage from "../../assets/images/badge.png"

function CongratulationsModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 dark:bg-black dark:bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Congratulationssss</h2>
        <img 
          src={badgeImage}
          alt="Heart I Badge" 
          className="mx-auto mb-4 w-24 h-24" 
        />
        <p className="text-lg">You just unlocked Chemistry III badge!</p>
        <button
          className="mt-4 px-4 py-2 rounded bg-primary text-white dark:bg-primary-dark dark:text-black"
          onClick={onClose}
        >
          <span className="uppercase">Close</span>
        </button>
      </div>
    </div>
  );
}

export default CongratulationsModal;
