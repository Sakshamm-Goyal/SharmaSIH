import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Topic() {
  const [selectedSteps, setSelectedSteps] = useState([]);
  const navigate = useNavigate();

  const handleCheckmarkClick = (step) => {
    if (step === 1 || (step === 2 && selectedSteps.includes(1))) {
      setSelectedSteps(prevSteps => 
        prevSteps.includes(step) ? prevSteps.filter(s => s !== step) : [...prevSteps, step]
      );
    }
  };

  const handleTakeAssessment = () => {
    navigate('/quiz/Time-&-Space-Complexity', { replace: true });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Course on the Topic</h1>

      {/* First Video */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
              selectedSteps.includes(1) ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 dark:border-gray-600'
            } mr-4 cursor-pointer`}
            onClick={() => handleCheckmarkClick(1)}
          >
            {selectedSteps.includes(1) && <span className="text-xl">✔️</span>}
          </div>
          <h2 className="text-xl font-semibold">Learn the Topic</h2>
        </div>
        <div className="relative mb-4 mx-auto max-w-2xl">
          <iframe
            title="Heart"
            src="https://www.youtube.com/embed/jU9w6w8LwqM?autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-96" // Height increased here
          />
        </div>
      </div>

      {/* Second Video */}
      <div className={`mb-8 ${selectedSteps.includes(1) ? '' : 'opacity-50 cursor-not-allowed'}`}>
        <div className="flex items-center mb-2">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
              selectedSteps.includes(2) ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 dark:border-gray-600'
            } mr-4 cursor-pointer`}
            onClick={() => handleCheckmarkClick(2)}
          >
            {selectedSteps.includes(2) && <span className="text-xl">✔️</span>}
          </div>
          <h2 className="text-xl font-semibold">Examine with the Help of VR</h2>
        </div>
        <div className="relative mb-4 mx-auto max-w-2xl">
          <iframe
            title="VR Examination"
            src="https://www.youtube.com/embed/3V8YMnIcpkI"
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
            className="w-full h-96" // Height increased here
          />
        </div>
      </div>

      {/* Quiz Section */}
      <div className={`${selectedSteps.includes(2) ? '' : 'opacity-50 cursor-not-allowed'}`}>
        
        <div className="flex justify-center mt-4">
          <button
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 ${
              selectedSteps.includes(2) ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!selectedSteps.includes(2)}
            onClick={handleTakeAssessment}
          >
            Take an Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topic;
