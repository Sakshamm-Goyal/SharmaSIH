import React, { useState, useEffect, useRef } from 'react';
import './Topic.css'; // Ensure this file contains the necessary styles
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaVrCardboard } from 'react-icons/fa'; // Import VR icon

function Topic() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openSections, setOpenSections] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
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
    // Handle VR button click
    console.log('VR Button Clicked');
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
          {/* Timestamps */}
          <div className="sidebar-header">
            <h2 className="text-xl font-bold mb-4">Timestamps</h2>
            <button className="-border" onClick={handleVrClick}>
              <FaVrCardboard className="vr-icon" />
              VR
            </button>
          </div>
          <ul className="timestamp-list">
            {/* Timestamp sections */}
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
            {/* Additional sections */}
          </ul>
          <div className="start-quiz-container">
            <button className="start-quiz-btn" onClick={handleStartQuiz}>
              Start Your Quiz
            </button>
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
                The heart is a muscular organ in humans and other animals that pumps blood through the circulatory system. It is located slightly left of the center of the chest. The heart has four chambers: two upper atria and two lower ventricles. The heart pumps blood through a series of blood vessels, including arteries, veins, and capillaries. The heart's function is essential for supplying oxygen and nutrients to tissues and removing carbon dioxide and other wastes.
              </p>
              <p>
                The heart's rhythm is regulated by the sinoatrial (SA) node, which is often referred to as the natural pacemaker. Electrical impulses travel through the heart muscle, causing it to contract and pump blood. The heart's pumping action can be divided into two phases: systole (contraction) and diastole (relaxation). Proper functioning of the heart is crucial for maintaining overall health and preventing cardiovascular diseases.
              </p>
              <div className="video-section">
                <h3>Video: Heart Overview</h3>
                <iframe
                  title="Heart Overview"
                  src="https://www.youtube.com/embed/VIDEO_ID_HERE" // Replace with your video URL
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-60"
                />
              </div>
            </div>
          )}
          {activeTab === 'notes' && (
  <div>
    <h2 className="section-title">Notes</h2>
    <textarea
      value={newNote}
      onChange={(e) => setNewNote(e.target.value)}
      placeholder="Add your note here..."
      className="note-input"
    />
    <button
      onClick={handleAddNote}
      className="add-note-btn"
    >
      Add Note
    </button>
    <ul className="notes-list">
      {notes.map((note, index) => (
        <li key={index} className="note-item">
          {note.text}
        </li>
      ))}
    </ul>
  </div>
)}

{activeTab === 'qna' && (
  <div>
    <h2 className="section-title">Q&A</h2>
    <textarea
      value={newQuestion}
      onChange={(e) => setNewQuestion(e.target.value)}
      placeholder="Ask a question..."
      className="question-input"
    />
    <button
      onClick={handleAddQuestion}
      className="add-question-btn"
    >
      Ask Question
    </button>
    <ul className="questions-list">
      {questions.map((q, index) => (
        <li key={index} className="question-item">
          <p className="question-text">{q.question}</p>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer..."
            className="answer-input"
          />
          <button
            onClick={() => handleAnswerQuestion(index)}
            className="submit-answer-btn"
          >
            Submit Answer
          </button>
          {q.answer && <p className="answer-text">Answer: {q.answer}</p>}
        </li>
      ))}
    </ul>
  </div>
)} </div> </div> </div>);
}

export default Topic;