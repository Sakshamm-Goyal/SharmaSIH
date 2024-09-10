import { useState, useEffect, useRef } from 'react';
import './Topic.css'; // Ensure this file contains the necessary styles
import { FiPlus } from 'react-icons/fi';
import { Button } from "../components/atoms/MovingBorder";
import { useNavigate } from 'react-router-dom';
import { FaVrCardboard } from 'react-icons/fa'; // Import VR icon
import VrParent from '../components/atoms/VrParent'; // Import the VrPopup component

function Topic() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openSections, setOpenSections] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isVrPopupOpen, setIsVrPopupOpen] = useState(false); // State for VR popup visibility
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(videoRef.current, {
        events: {
          onReady: () => {
            console.log('YouTube Player Ready');
          },
        },
      });
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTimestampClick = (timestamp) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timestamp, true);
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };

  const handleStartQuiz = () => {
    navigate('/quiz/Heart');
  };

  const handleVrClick = () => {
    setIsVrPopupOpen(true); // Open the VR popup
  };

  const handlePopupClose = () => {
    setIsVrPopupOpen(false); // Close the VR popup
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { text: newNote, timestamp: Date.now() }]);
      setNewNote('');
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { question: newQuestion, answer: '' }]);
      setNewQuestion('');
    }
  };

  const handleAnswerQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = newAnswer;
    setQuestions(updatedQuestions);
    setNewAnswer('');
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
                &nbsp;
                VR
              </Button>
            </div>
          </div>
          <ul className="timestamp-list">
            <li className="section">
              <div className="section-header" onClick={() => toggleSection('intro1')}>
                <span>Introduction 1</span>
                <FiPlus className={`add-icon ${openSections.includes('intro1') ? 'rotated' : ''}`} />
              </div>
              {openSections.includes('intro1') && (
                <div className="section-content">
                  <p onClick={() => handleTimestampClick(0)}>00:00 - Introduction 1</p>
                  <div className="quiz-section">
                    <h3>Quiz</h3>
                    <div className="quiz-card">
                      <p>What is the main topic of this section?</p>
                      <ul>
                        <li>Introduction</li>
                        <li>Main Concepts</li>
                        <li>Detailed Analysis</li>
                        <li>Conclusion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="section">
              <div className="section-header" onClick={() => toggleSection('intro2')}>
                <span>Introduction 2</span>
                <FiPlus className={`add-icon ${openSections.includes('intro2') ? 'rotated' : ''}`} />
              </div>
              {openSections.includes('intro2') && (
                <div className="section-content">
                  <p onClick={() => handleTimestampClick(0)}>00:00 - Introduction 2</p>
                  <div className="quiz-section">
                    <h3>Quiz</h3>
                    <div className="quiz-card">
                      <p>What is the main topic of this section?</p>
                      <ul>
                        <li>Introduction</li>
                        <li>Main Concepts</li>
                        <li>Detailed Analysis</li>
                        <li>Conclusion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
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
            ref={videoRef}
            title="Learn the Topic"
            src="https://www.youtube.com/embed/jU9w6w8LwqM?enablejsapi=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {/* Navigation Bar for Tabs */}
        <nav className="mt-3 flex w-full justify-around border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'notes' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'review' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            Review
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'qna' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('qna')}
          >
            Q&A
          </button>
        </nav>

        {/* Tab Content */}
        <div className="p-4 w-full">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-bold">Overview</h2>
              <p>
                The heart is a muscular organ in humans and other animals that pumps blood through the circulatory system. It is located slightly left of the center of the chest. The heart has four chambers: two upper atria and two lower ventricles. The heart pumps blood through a series of blood vessels, including arteries, veins, and capillaries.
              </p>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h2 className="text-lg font-bold">Notes</h2>
              <ul>
                {notes.map((note, index) => (
                  <li key={index} className="note">
                    {note.text}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note"
              />
              <button onClick={handleAddNote}>Add Note</button>
            </div>
          )}

          {activeTab === 'review' && (
            <div>
              <h2 className="text-lg font-bold">Review</h2>
              <p>
                Here, you can review the content covered in this section. Make sure you understand the key concepts before moving on.
              </p>
            </div>
          )}

          {activeTab === 'qna' && (
            <div>
              <h2 className="text-lg font-bold">Q&A</h2>
              <ul>
                {questions.map((q, index) => (
                  <li key={index} className="qna-item">
                    <p><strong>Q:</strong> {q.question}</p>
                    <p><strong>A:</strong> {q.answer}</p>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Add a question"
              />
              <button onClick={handleAddQuestion}>Add Question</button>
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Add an answer"
              />
              <button onClick={() => handleAnswerQuestion(questions.length - 1)}>Add Answer</button>
            </div>
          )}
        </div>
      </div>

      {/* VR Popup */}
      {isVrPopupOpen && (
        <VrParent onClose={handlePopupClose} />
      )}
    </div>
  );
}

export default Topic;
