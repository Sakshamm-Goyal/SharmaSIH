import React, { useState, useEffect } from 'react';
import './Topic.css'; // Ensure this file contains the necessary styles
import { FiPlus } from 'react-icons/fi';
import { Button } from "../components/atoms/MovingBorder";
import { useNavigate, useParams } from 'react-router-dom';
import { FaVrCardboard } from 'react-icons/fa'; // Import VR icon
import VrParent from '../components/atoms/VrParent'; // Import the VrPopup component

function Topic() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openSections, setOpenSections] = useState([]);
  const [isVrPopupOpen, setIsVrPopupOpen] = useState(false); // State for VR popup visibility
  const { topicName } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);

  useEffect(() => {
    // Fetch topic data based on topicName
    fetch(`/data.json`) // Adjust this URL if fetching from an API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        const topicData = jsonData.find((item) => item.id === topicName);
        if (topicData) {
          setData(topicData);
        } else {
          console.error(`No matching topic data found for topicName: ${topicName}`);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [topicName]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTimestampClick = (timestamp) => {
    const iframe = document.getElementById('topic-video');
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: 'seekTo', args: [timestamp, true] }),
      '*'
    );
  };

  const toggleSection = (section) => {
    setOpenSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${data.id}`);
  };

  const handleVrClick = () => {
    setIsVrPopupOpen(true); // Open the VR popup
  };

  const handlePopupClose = () => {
    setIsVrPopupOpen(false); // Close the VR popup
  };

  const handleAddNote = () => {
    if (newNote.trim() && data) {
      const updatedNotes = [...data.notes, { text: newNote, timestamp: Date.now() }];
      setData({ ...data, notes: updatedNotes });
      setNewNote('');
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() && data) {
      const updatedQuestions = [...data.qna, { question: newQuestion, answer: '' }];
      setData({ ...data, qna: updatedQuestions });
      setNewQuestion('');
    }
  };

  const handleAnswerQuestion = (index) => {
    if (data) {
      const updatedQuestions = [...data.qna];
      updatedQuestions[index].answer = newAnswer;
      setData({ ...data, qna: updatedQuestions });
      setNewAnswer('');
    }
  };

  const handleOptionSelect = (option, correctOption) => {
    setSelectedOption(option);
    setCorrectOption(correctOption);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={handleSidebarToggle}>
          &times;
        </button>
        <div className="p-4">
          <div className="sidebar-header">
            <h2 className="text-xl font-bold mb-4">Timestamps</h2>
            <div>
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 text-xl"
                onClick={handleVrClick} // Handle VR button click
              >
                <FaVrCardboard className="vr-icon" />
                &nbsp; VR
              </Button>
            </div>
          </div>
          <ul className="timestamp-list">
            {data?.timestamps?.map((timestamp, index) => (
              <li key={index} className="section">
                <div className="section-header" onClick={() => toggleSection(timestamp.section)}>
                  <span>{timestamp.section}</span>
                  <FiPlus className={`add-icon ${openSections.includes(timestamp.section) ? 'rotated' : ''}`} />
                </div>
                {openSections.includes(timestamp.section) && (
                  <div className="section-content">
                    {/* Display Quiz Question and Options if available */}
                    {timestamp.quiz && (
                      <div className="quiz-section mt-2">
                        <p className="quiz-question font-bold">{timestamp.quiz.question}</p>
                        <ul className="quiz-options list-disc pl-5">
                          {timestamp.quiz.options.map((option, optIndex) => (
                            <li
                              key={optIndex}
                              className={`quiz-option ${selectedOption === option ? (option === correctOption ? 'correct' : 'incorrect') : ''}`}
                              onClick={() => handleOptionSelect(option, timestamp.quiz.correctAnswer)}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="start-quiz-container">
            <Button
              borderRadius="1.75rem"
              onClick={handleStartQuiz}
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 text-l"
            >
              Start Your Quiz
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {!isSidebarOpen && (
          <button className="course-content-btn" onClick={handleSidebarToggle}>
            Course Content
          </button>
        )}

        {/* Main Video */}
        <div className="relative w-full h-[70%]">
          <iframe
            id="topic-video"
            title={data?.video?.title || 'Learn the Topic'}
            src={data?.video?.link }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {/* Navigation Bar for Tabs */}
        <nav className="mt-3 flex w-full justify-around border-b">
          {data?.tabs?.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="p-4 w-full">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-bold">{data?.overview?.title || 'Overview'}</h2>
              <p>{data?.overview?.content}</p>
            </div>
          )}
          {activeTab === 'notes' && (
            <div>
              <h2 className="text-lg font-bold">Notes</h2>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button onClick={handleAddNote} className="mt-2 py-1 px-3 bg-blue-500 text-white rounded">
                Add Note
              </button>
              <ul className="mt-4">
                {data?.notes?.map((note, index) => (
                  <li key={index} className="py-2">
                    {note.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'qna' && (
            <div>
              <h2 className="text-lg font-bold">Q&A</h2>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Ask a question..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <button onClick={handleAddQuestion} className="mt-2 py-1 px-3 bg-blue-500 text-white rounded">
                Add Question
              </button>
              <ul className="mt-4">
                {data?.qna?.map((item, index) => (
                  <li key={index} className="py-2">
                    <p className="font-bold">{item.question}</p>
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Write an answer..."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <button onClick={() => handleAnswerQuestion(index)} className="mt-2 py-1 px-3 bg-blue-500 text-white rounded">
                      Submit Answer
                    </button>
                    <p>{item.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* VR Popup */}
      {isVrPopupOpen && (
        <VrParent isOpen={isVrPopupOpen} onClose={handlePopupClose} />
      )}
    </div>
  );
}

export default Topic;
