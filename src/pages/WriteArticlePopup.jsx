import React, { useState } from 'react';
import Modal from 'react-modal';
import './Popup.css';

const WriteArticlePopup = ({ isOpen, onClose }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedGif, setSelectedGif] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  // Handle modal close and reset state
  const handleClose = () => {
    setPostContent('');       // Clear post content
    setSelectedGif(null);     // Clear selected GIF
    setSelectedImage(null);   // Clear selected image
    onClose();                // Close the modal
  };

  // Handle post submission
  const handleSubmit = () => {
    console.log("Post content:", postContent);
    console.log("Selected image:", selectedImage);
    console.log("Selected GIF:", selectedGif);
    handleClose(); // Reset state and close the modal after submission
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal" overlayClassName="overlay">
      <div className="modal-content bg-gray-900 p-8 rounded-lg text-white relative">
        {/* Close Button (X) */}
        <button onClick={handleClose} className="close-button absolute top-2 right-2 text-white hover:text-gray-400 text-2xl">
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4">Write Your Article:</h2>

        {/* Textarea for the post */}
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your post here..."
          className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none mb-4"
          rows="8"
        />

        {/* GIF & Image Selection */}
        <div className="media-preview mb-4 flex items-center space-x-2">
          <button
            className="bg-gray-800 p-2 rounded-lg"
            onClick={() => setSelectedGif("https://media.giphy.com/media/13gvXfEVlxQjDO/giphy.gif")}
          >
            Select GIF
          </button>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 bg-gray-800 rounded-lg"
          />
        </div>

        <div className="preview-container">
          {selectedGif && <img src={selectedGif} alt="Selected GIF" className="preview-img mt-2 rounded-lg" />}
          {selectedImage && <img src={selectedImage} alt="Selected" className="preview-img mt-2 rounded-lg" />}
        </div>

        <button className="bg-primary p-2 rounded-lg w-full text-bold mt-4" onClick={handleSubmit}>
          Post It
        </button>
      </div>
    </Modal>
  );
};

export default WriteArticlePopup;
