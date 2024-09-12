import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Messages.css';

const Message = () => {
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false); // State to show/hide sidebar menu
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatListOpen, setIsChatListOpen] = useState(false); // For sliding chat list
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const [chats, setChats] = useState([
    {
      contact: 'Rohit Sharma',
      messages: [
        {
          sender: 'Rohit Sharma',
          message: 'Hey, how are you?',
          timestamp: new Date()
        },
        {
          sender: 'You',
          message: 'I am good, how about you?',
          timestamp: new Date()
        }
      ]
    },
    {
      contact: 'Rishi Jain ',
      messages: [
        {
          sender: 'Rishi Jain',
          message: 'Hi! What are you doing?',
          timestamp: new Date()
        },
        {
          sender: 'You',
          message: 'Just working on a project.',
          timestamp: new Date()
        }
      ]
    },
    {
      contact: 'Shivansh Singh',
      messages: [
        {
          sender: 'Shivansh Singh',
          message: 'Hey, how are you GATE Exam?',
          timestamp: new Date()
        },
        {
          sender: 'You',
          message: 'I am good, how about you?',
          timestamp: new Date()
        }
      ]
    },
    {
      contact: 'Khushi Kalra',
      messages: [
        {
          sender: 'Khushi Kalra',
          message: 'Hey, how are you?',
          timestamp: new Date()
        },
        {
          sender: 'You',
          message: 'I am good, what are you doing?',
          timestamp: new Date()
        }
      ]
    },
    {
      contact: 'Rishit Tiwari',
      messages: [
        {
          sender: 'Rishit Tiwari',
          message: 'Hey, let do contests?',
          timestamp: new Date()
        },
        { sender: 'You', message: 'ok, when?', timestamp: new Date() }
      ]
    },
    {
      contact: 'ABC',
      messages: [
        {
          sender: 'ABC',
          message: 'Hey, how are you?',
          timestamp: new Date()
        },
        {
          sender: 'You',
          message: 'I am good, what are you doing?',
          timestamp: new Date()
        }
      ]
    }
    // More dummy contacts can be added here
  ]);

  // MessageList.js
  const MessageList = ({ chats, selectedChat, setSelectedChat }) => {
    return (
      <div className='w-1/4 bg-gray-800 border-r border-gray-700'>
        <div className='p-4 border-b border-gray-700'>
          <h2 className='text-lg font-semibold'>Chats</h2>
          <input
            type='text'
            placeholder='Search or start a new chat'
            className='mt-2 w-full p-2 bg-gray-700 text-gray-300 rounded-lg'
          />
        </div>
        <ul className='overflow-y-scroll h-full'>
          {chats.map((chat, index) => (
            <li
              key={index}
              onClick={() => setSelectedChat(index)}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${selectedChat === index ? 'bg-gray-700' : ''}`}
              >
              <div className='ml-3'>
                <p className='font-semibold'>{chat.contact}</p>
                <p className='text-gray-400 text-sm'>
                  {chat.messages[chat.messages.length - 1]?.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // ChatWindow.js
  const ChatWindow = ({ chats, selectedChat, message, setMessage, sendMessage }) => {
    return (
      <div className='w-3/4 flex flex-col'>
        <div className='p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>
            {chats[selectedChat]?.contact || 'Select a chat'}
          </h2>
          <div className='flex items-center space-x-4'>
            <button className='p-2 bg-gray-700 rounded-full'>📞</button>
            <button className='p-2 bg-gray-700 rounded-full'>📹</button>
            <button className='p-2 bg-gray-700 rounded-full'>ℹ️</button>
          </div>
        </div>
        <div className='flex-1 p-4 overflow-y-scroll bg-gray-900'>
          {chats[selectedChat]?.messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.sender === 'You' ? 'text-right' : 'text-left'
              }`}
            >
              <span className='block text-gray-500 text-xs mb-1'>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === 'You'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div className='p-4 bg-gray-800 border-t border-gray-700 flex items-center'>
          <input
            type='text'
            className='flex-1 p-2 bg-gray-700 text-white rounded-l-lg'
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder='Type your message...'
          />
          <button
            onClick={sendMessage}
            className='bg-green-600 p-2 rounded-r-lg'
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  // Toggle chat list
  const toggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };

  // Open chat popup when a chat is selected
  const openChatPopup = (chat) => {
    setSelectedChat(chat);
    setIsChatPopupOpen(true);
  };

  // Close chat popup
  const closeChatPopup = () => {
    setIsChatPopupOpen(false);
  };

   // Toggle button state
   const handleConnectClick = (index) => {
    const newContacts = [...contacts];
    newContacts[index].isPending = !newContacts[index].isPending;
    setContacts(newContacts);
  };

  const [contacts, setContacts] = useState([
    {
      name: 'Alice Johnson',
      company: 'Tech Innovations',
      designation: 'Product Manager',
      profilePic: 'https://via.placeholder.com/50',
      isPending: false,
    },
    {
      name: 'Bob Williams',
      company: 'Data Solutions',
      designation: 'Data Scientist',
      profilePic: 'https://via.placeholder.com/50',
      isPending: false,
    },
    {
      name: 'Charlie Brown',
      company: 'Creative Agency',
      designation: 'UI/UX Designer',
      profilePic: 'https://via.placeholder.com/50',
      isPending: false,
    },
  ]);

  const [jobs, setJobs] = useState([
    {
      title: 'Frontend Developer',
      company: 'Tech Company',
      description:
        'Looking for a skilled React developer to join our team. Experience in JavaScript and React is required.',
      logo: 'https://via.placeholder.com/50',
      requiredSkills: ['JavaScript', 'React', 'Node.js'],
      location: 'San Francisco, CA',
      remote: true,
      jobType: 'Full-time',
      datePosted: '2024-09-05'
    },
    {
      title: 'Data Analyst',
      company: 'Data Solutions Inc.',
      description:
        'We need a data analyst proficient in Python and SQL to help with data-driven decision making.',
      logo: 'https://via.placeholder.com/50',
      requiredSkills: ['JavaScript', 'React', 'Node.js'],
      location: 'San Francisco, CA',
      remote: true,
      jobType: 'Full-time',
      datePosted: '2024-09-05'
    }
    // More job listings can be added here
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: 'You', message, timestamp: new Date() };
      const updatedChats = [...chats];
      updatedChats[selectedChat].messages.push(newMessage);
      setChats(updatedChats);
      setMessage('');
    }
  }

  // Function to render the content of the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className='flex-1 p-20 overflow-y-auto bg-gray-900'>
            <div className='flex space-x-6'>
              {/* User Profile Section */}
              <div className='flex-none w-1/4 bg-gray-800 p-4 rounded-lg shadow-md'>
                <div className='flex items-center'>
                  <img
                    src='https://via.placeholder.com/50'
                    alt='Profile'
                    className='w-16 h-16 rounded-full mr-4'
                  />
                  <div>
                    <h2 className='text-xl font-semibold text-white'>John Doe</h2>
                    <p className='text-gray-400'>Your Profile</p>
                  </div>
                </div>
              </div>

              {/* Search Bar and Create Post Buttons Section */}
              <div className='flex-1 bg-gray-900 p-4'>
                <div className='mb-6'>
                  <div className='flex items-center mb-4 bg-gray-800 p-3 rounded-lg shadow-md'>
                    <input
                      type='text'
                      placeholder='Start a post, try writing with AI'
                      className='flex-1 p-2 bg-gray-700 rounded-full focus:outline-none text-white placeholder-gray-400'
                    />
                    <button className='ml-3 text-gray-400 hover:text-white'>
                      <i className='fas fa-search'></i>
                    </button>
                  </div>
                  <div className='flex justify-around mb-4 text-gray-400'>
                    <button className='flex items-center p-2 hover:text-blue-400'>
                      <i className='fas fa-photo-video mr-2'></i>
                      Media
                    </button>
                    <button className='flex items-center p-2 hover:text-green-400'>
                      <i className='fas fa-briefcase mr-2'></i>
                      Job
                    </button>
                    <button className='flex items-center p-2 hover:text-red-400'>
                      <i className='fas fa-pencil-alt mr-2'></i>
                      Write Article
                    </button>
                  </div>
                </div>
                <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
                  <img
                    src='https://via.placeholder.com/50'
                    alt='Jane Doe'
                    className='w-12 h-12 rounded-full mb-2'
                  />
                  <h3 className='text-lg font-semibold text-white'>Jane Doe</h3>
                  <p className='text-gray-300 mt-2'>
                    Just finished a great project on web development!
                  </p>
                  <div className='mt-auto flex space-x-2'>
                    <button className='bg-blue-600 text-white px-3 py-1 rounded'>Like</button>
                    <button className='bg-green-600 text-white px-3 py-1 rounded'>Comment</button>
                    <button className='bg-red-600 text-white px-3 py-1 rounded'>Share</button>
                  </div>
                </div>
                <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
                  <img
                    src='https://via.placeholder.com/50'
                    alt='John Smith'
                    className='w-12 h-12 rounded-full mb-2'
                  />
                  <h3 className='text-lg font-semibold text-white'>John Smith</h3>
                  <p className='text-gray-300 mt-2'>
                    Looking for new opportunities in data science.
                  </p>
                  <div className='mt-auto flex space-x-2'>
                    <button className='bg-blue-600 text-white px-3 py-1 rounded'>Like</button>
                    <button className='bg-green-600 text-white px-3 py-1 rounded'>Comment</button>
                    <button className='bg-red-600 text-white px-3 py-1 rounded'>Share</button>
                  </div>
                </div>
              </div>

              {/* Contact Cards Section */}
              <div className='flex-none w-1/4 bg-gray-900 p-4'>
                <div className='flex flex-col space-y-4'>
                  {contacts.map((contact, index) => (
                    <div key={index} className='bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4'>
                      <img
                        src={contact.profilePic}
                        alt={contact.name}
                        className='w-16 h-16 rounded-full'
                      />
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-white'>{contact.name}</h3>
                        <p className='text-gray-400'>{contact.company} - {contact.designation}</p>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-lg ${contact.isPending ? 'bg-gray-500 text-gray-300' : 'bg-blue-600 text-white'}`}
                        onClick={() => handleConnectClick(index)}
                      >
                        {contact.isPending ? 'Pending' : 'Connect+'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );



      // case 'messages':
      //   return (
      //     <div className='flex h-full'>
      //       {/* Left Sidebar - Contacts */}
      //       <div className='w-1/4 bg-gray-800 border-r border-gray-700'>
      //         <div className='p-4 border-b border-gray-700'>
      //           <h2 className='text-lg font-semibold'>Chats</h2>
      //           <input
      //             type='text'
      //             placeholder='Search or start a new chat'
      //             className='mt-2 w-full p-2 bg-gray-700 text-gray-300 rounded-lg'
      //           />
      //         </div>
      //         <ul className='overflow-y-auto h-full'>
      //           {chats.map((chat, index) => (
      //             <li
      //               key={index}
      //               onClick={() => setSelectedChat(index)}
      //               className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${
      //                 selectedChat === index ? 'bg-gray-700' : ''
      //               }`}
      //             >
      //               <div className='ml-3'>
      //                 <p className='font-semibold'>{chat.contact}</p>
      //                 <p className='text-gray-400 text-sm'>
      //                   {chat.messages[chat.messages.length - 1]?.message}
      //                 </p>
      //               </div>
      //             </li>
      //           ))}
      //         </ul>
      //       </div>

      //       {/* Right Sidebar - Chat */}
      //       <div className='w-3/4 flex flex-col'>
      //         <div className='p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center'>
      //           <h2 className='text-lg font-semibold'>
      //             {chats[selectedChat]?.contact || 'Select a chat'}
      //           </h2>
      //           <div className='flex items-center space-x-4'>
      //             <button className='p-2 bg-gray-700 rounded-full'>📞</button>
      //             <button className='p-2 bg-gray-700 rounded-full'>📹</button>
      //             <button className='p-2 bg-gray-700 rounded-full'>ℹ️</button>
      //           </div>
      //         </div>
      //         <div className='flex-1 p-4 overflow-y-auto bg-gray-900'>
      //           {chats[selectedChat]?.messages.map((msg, index) => (
      //             <div
      //               key={index}
      //               className={`mb-4 ${
      //                 msg.sender === 'You' ? 'text-right' : 'text-left'
      //               }`}
      //             >
      //               <span className='block text-gray-500 text-xs mb-1'>
      //                 {new Date(msg.timestamp).toLocaleTimeString()}
      //               </span>
      //               <div
      //                 className={`inline-block p-2 rounded-lg ${
      //                   msg.sender === 'You'
      //                     ? 'bg-green-600 text-white'
      //                     : 'bg-gray-700 text-gray-200'
      //                 }`}
      //               >
      //                 {msg.message}
      //               </div>
      //             </div>
      //           ))}
      //         </div>
      //         <div className='p-4 bg-gray-800 border-t border-gray-700 flex items-center'>
      //           <input
      //             type='text'
      //             className='flex-1 p-2 bg-gray-700 text-white rounded-l-lg'
      //             value={message}
      //             onChange={e => setMessage(e.target.value)}
      //             placeholder='Type your message...'
      //           />
      //           <button
      //             onClick={sendMessage}
      //             className='bg-green-600 p-2 rounded-r-lg'
      //           >
      //             Send
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   )
        
      case 'messages':
        return (
          <div className='flex h-full'>
            <MessageList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
            <ChatWindow
              chats={chats}
              selectedChat={selectedChat}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        );

        case 'jobs':
        // Filter the jobs based on the search term
        const filteredJobs = jobs.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return (
          <div className='flex'>
            <div className='w-3/4 p-20'>
              {/* Search Bar */}
              <input
                type='text'
                placeholder='Search for jobs...'
                className='w-full p-2 bg-primary text-white dark:bg-gray-800 dark:text-gray-300 rounded-lg mb-4'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              {/* Job Listings */}
              <div>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <div
                      key={index}
                      className='mb-4 flex items-center rounded-lg bg-primary p-4 dark:bg-gray-800'
                    >
                      <img src={job.logo} alt={job.company} className='w-12 h-12 mr-4' />
                      <div>
                        <h3 className='text-lg font-semibold text-white'>{job.title}</h3>
                        <p className='text-gray-300'>{job.company}</p>
                        <p className='text-gray-200 mt-2'>{job.location}</p>
                        <p className='text-gray-200 mt-2'>{job.jobType}</p>
                        <p className='text-gray-200 mt-2'>{job.remote}</p>
                        <p className='text-gray-300 text-xs mt-5'>{job.datePosted}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-400'>No jobs found</p>
                )}
              </div>
            </div>
            <div className='w-1/4 bg-primary p-20 dark:bg-gray-800 border-gray-700' style={{ height: '300px', width: '400px' }}>
              {/* Sidebar */}
              <div className='flex flex-col h-full justify-between'>
                <div>
                  <h2 className='text-lg font-semibold mb-4'>My Jobs</h2>
                  <Link to="/learn">
                    <h2 className='text-lg font-semibold mt-8 cursor-pointer hover:underline'>Skill Assessment</h2>
                  </Link>
                  <p className='text-gray-200 mt-2'>
                    Assess your skills and improve them with our tailored assessments.
                  </p>
                </div>
              </div>
    </div>
          </div>
        )

      default:
        return <div>Content not found</div>
    }
  };

  return (
    <div className='flex h-screen dark:bg-gray-900 dark:text-white bg-white text-black'>
      {/* Left Sidebar - Icons/Menu */}
      {/* <div
        className={`${
          sidebarExpanded ? 'w-1/4' : 'w-16'
        } bg-white dark:bg-gray-800 border-r border-gray-700 relative transition-all duration-300`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {sidebarExpanded ? (
          <ul className='absolute top-0 left-0 w-full bg-gray-800 h-full'>
            <li
              onClick={() => setActiveSection('home')}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${
                activeSection === 'home' ? 'bg-gray-700' : ''
              }`}
            >
              <span className='mr-2'>🏠</span> Home
            </li>
            <li
              onClick={() => setActiveSection('messages')}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${
                activeSection === 'messages' ? 'bg-gray-700' : ''
              }`}
            >
              <span className='mr-2'>💬</span> Messages
            </li>
            <li
              onClick={() => setActiveSection('jobs')}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${
                activeSection === 'jobs' ? 'bg-gray-700' : ''
              }`}
            >
              <span className='mr-2'>💼</span> Jobs
            </li>
          </ul>
        ) : (
          <div className='p-4 flex flex-col items-center space-y-4'>
            <button
              onClick={() => setActiveSection('home')}
              className={`p-2 bg-gray-700 rounded-full ${
                activeSection === 'home' ? 'bg-gray-700' : ''
              }`}
            >
              🏠
            </button>
            <button
              onClick={() => setActiveSection('messages')}
              className={`p-2 bg-gray-700 rounded-full ${
                activeSection === 'messages' ? 'bg-gray-700' : ''
              }`}
            >
              💬
            </button>
            <button
              onClick={() => setActiveSection('jobs')}
              className={`p-2 bg-gray-700 rounded-full ${
                activeSection === 'jobs' ? 'bg-gray-700' : ''
              }`}
            >
              💼
            </button>
          </div>
        )}
      </div> */}

      {/* Main Content Area */}
      <div className='flex-1'>
        {renderContent()}
        {/* Chat Slider */}
          <div className={`fixed bottom-0 left-0 z-50 ${isChatExpanded ? 'w-1/2 h-3/4' : 'w-full max-w-xs'} bg-gray-800 border-t border-gray-700`}>
            <div className='p-4 relative'>
              <h2 className='text-lg font-semibold text-white'>Chat</h2>
              <button
                className='absolute top-2 right-2 text-gray-400 hover:text-white'
                onClick={() => setIsChatExpanded(!isChatExpanded)}
              >
                {isChatExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            {isChatExpanded && (
              <div className='h-full overflow-y-scroll'>
                <MessageList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default Message;
