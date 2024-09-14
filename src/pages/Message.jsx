import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Messages.css'
import WriteArticlePopup from './WriteArticlePopup'

const Message = () => {
  const navigate = useNavigate()
  const [selectedChat, setSelectedChat] = useState(0)
  const [message, setMessage] = useState('')
  const [isChatListOpen, setIsChatListOpen] = useState(false)
  const [isChatExpanded, setIsChatExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const handleClick = () => {
    setIsConnected(!isConnected)
  }
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
  ])

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
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${
                selectedChat === index ? 'bg-gray-700' : ''
              }`}
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
    )
  }

  // ChatWindow.js
  const ChatWindow = ({
    chats,
    selectedChat,
    message,
    setMessage,
    sendMessage
  }) => {
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
    )
  }

  // Toggle chat list
  const toggleChatList = () => {
    setIsChatListOpen(!isChatListOpen)
  }

  // Open chat popup when a chat is selected
  const openChatPopup = chat => {
    setSelectedChat(chat)
    setIsChatPopupOpen(true)
  }

  // Close chat popup
  const closeChatPopup = () => {
    setIsChatPopupOpen(false)
  }

  // Toggle button state
  const handleConnectClick = index => {
    const newContacts = [...contacts]
    newContacts[index].isPending = !newContacts[index].isPending
    setContacts(newContacts)
  }

  const [contacts, setContacts] = useState([
    {
      name: 'Alice Johnson',
      company: 'Tech Innovations',
      designation: 'Product Manager',
      profilePic: 'https://via.placeholder.com/50',
      isPending: false
    },
    {
      name: 'Bob Williams',
      company: 'Data Solutions',
      designation: 'Data Scientist',
      profilePic: 'https://via.placeholder.com/50',
      isPending: false
    },
    {
      name: 'Charlie Brown',
      company: 'Creative Agency',
      designation: 'UI/UX Designer',
      profilePic: 'https://via.placeholder.com/50',
      isPending: false
    }
  ])

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: 'You', message, timestamp: new Date() }
      const updatedChats = [...chats]
      updatedChats[selectedChat].messages.push(newMessage)
      setChats(updatedChats)
      setMessage('')
    }
  }

  // Function to render the content of the active section
  const renderContent = () => {
    return (
      <div className='flex-1 p-20 overflow-y-auto bg-black'>
        <div className='flex space-x-6'>
          {/* User Profile Section */}
          <div className='flex-none w-1/4 h-3/4 bg-gray-800 p-4 rounded-lg shadow-md'>
            {/* Profile Picture */}
            <div className='flex flex-col items-center mb-2 mt-4'>
              <img
                src='https://yt3.googleusercontent.com/BpaBYEiGibr8uiNMCWytJ5BdKbPtpqTJAuA5Ida5rXAe8Zfvr8keZSPXYSqGasjGo7OunF2w=s160-c-k-c0x00ffffff-no-rj'
                alt='Profile'
                className='w-38 h-38 rounded-full mb-4'
              />
            </div>

            {/* Name, Profile Link, and College Name */}
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-white uppercase mb-2'>
                Khushi Kalra
              </h2>
              <Link
                to='/profile'
                className='text-blue-400 hover:underline mb-2'
              >
                View Profile
              </Link>
              <p className='text-gray-400 mb-6'>
                Rajiv Gandhi Institute of Petroleum Technology, Jais
              </p>
            </div>

            {/* Achievements Heading */}
            <div>
              <h2 className='text-lg font-semibold text-white mb-4'>
                Achievements
              </h2>

              {/* Circles for Achievements */}
              <div className='flex justify-around mb-2'>
                <div className='w-20 h-20 rounded-full'>
                  <img
                    src='https://gssoc.girlscript.tech/badges/5.png?imwidth=256'
                    alt='badge'
                  />
                </div>
                <div className='w-20 h-20 rounded-full'>
                  <img
                    src='https://gssoc.girlscript.tech/badges/4.png?imwidth=256'
                    alt='badge'
                  />
                </div>
                <div className='w-20 h-20 rounded-full'>
                  <img
                    src='https://gssoc.girlscript.tech/badges/3.png?imwidth=256'
                    alt='badge'
                  />
                </div>
                <div className='w-20 h-20 rounded-full'>
                  <img
                    src='https://gssoc.girlscript.tech/badges/2.png?imwidth=256'
                    alt='badge'
                  />
                </div>
                <div className='w-20 h-20 rounded-full'>
                  <img
                    src='https://gssoc.girlscript.tech/badges/1.png?imwidth=256'
                    alt='badge'
                  />
                </div>
              </div>
            </div>
            {/* Sidebar */}
            <div className='flex flex-col h-full justify-between mt-4'>
              <div>
                <Link to='/jobs'>
                  <h2 className='text-lg font-semibold text-white mb-4 cursor-pointer hover:underline'>
                    My Jobs
                  </h2>
                </Link>
                <Link to='/learn'>
                  <h2 className='text-lg font-semibold mt-8 cursor-pointer hover:underline'>
                    Skill Assessment
                  </h2>
                </Link>
                <p className='text-gray-200 mt-2'>
                  Assess your skills and improve them with our tailored
                  assessments.
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar and Create Post Buttons Section */}
          <div className='flex-1 bg-gray-900 p-4'>
            <div className='mb-6'>
              <div className='flex items-center mb-4 bg-gray-900 p-3 rounded-lg shadow-md'>
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
                <button
                  className='flex items-center p-2 hover:text-green-400'
                  onClick={() => navigate('/jobs')}
                >
                  <i className='fas fa-briefcase mr-2'></i>
                  Job
                </button>
                <button
                  className='flex items-center p-2 hover:text-red-400'
                  onClick={() => setIsModalOpen(true)}
                >
                  <i className='fas fa-pencil-alt mr-2'></i>
                  Write Article
                </button>
              </div>
            </div>

            {/* POST-01 */}
            <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-4'>
              <div className='flex items-center'>
                <div className='ml-4 flex-grow'>
                  <div className='flex justify-between items-center'>
                    <img
                      src='data:image/jpeg;base64,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'
                      alt='Jane Doe'
                      className='w-20 h-20 rounded-full'
                    />
                    <div>
                      <h3 className='text-lg font-semibold text-white'>
                        Aliya Doe
                      </h3>
                      <p className='text-gray-300'>Web Developer</p>{' '}
                    </div>
                    <button
                      className={`px-4 py-1 rounded text-white ${
                        isConnected ? 'bg-primary-darker' : 'bg-primary'
                      }`}
                      onClick={handleClick}
                    >
                      {isConnected ? 'Pending' : 'Connect+'}
                    </button>
                  </div>
                  <p className='text-gray-300 mt-8 text-left'>
                    I am excited to share that our team reached the PRE-FINALE
                    of Myntra's <hacker-ramp /> WeForShe 2024 competition! 👩🏻‍💻✨
                    We were honored to be among the top 70 teams out of 10,000+
                    teams that participated nationwide, and what’s even more
                    exciting is that we were the only team from all 4 campuses
                    of Vellore Institute of Technology to achieve this milestone
                    and represent our college. This project focused on
                    leveraging data analytics to bridge the gap between Gen Z
                    shoppers and unavailabilty of unique homegrown brands on
                    Myntra💡
                  </p>
                  <p></p>
                </div>
              </div>

              {/* Grid for pictures */}
              <div className='grid grid-cols-3 gap-2 mt-4'>
                <img
                  src='https://media.licdn.com/dms/image/v2/D5622AQFMP-aKL4jZYg/feedshare-shrink_800/feedshare-shrink_800/0/1726036006473?e=1729123200&v=beta&t=kWgbHCfcXnvxCOzQL5phQ0jS8uqhJPfzm1FCT0tA0o8'
                  alt='Pic 1'
                  className='w-full h-auto rounded-lg'
                />
                <img
                  src='https://media.licdn.com/dms/image/v2/D5622AQFvLAYtxwdFzA/feedshare-shrink_800/feedshare-shrink_800/0/1726036002093?e=1729123200&v=beta&t=J7kcSgewvu_H1p44Nr70HASE1sa9F0HFCU4IFaAvsUQ'
                  alt='Pic 2'
                  className='w-full h-auto rounded-lg'
                />
                <img
                  src='https://media.licdn.com/dms/image/v2/D5622AQENPhjv62WwUw/feedshare-shrink_800/feedshare-shrink_800/0/1726036001898?e=1729123200&v=beta&t=ghexAmIRH2gWygqlZ3mFCldMi5ui_NGuF0Bjt0ifT-M'
                  alt='Pic 3'
                  className='w-full h-auto rounded-lg'
                />
              </div>

              {/* Action Buttons with Icons */}
              <div className='mt-10 flex justify-center space-x-2'>
                <button className='bg-blue-600 text-white px-3 py-1 rounded flex items-center'>
                  <i className='fas fa-thumbs-up mr-1'></i> Like
                </button>
                <button className='bg-green-600 text-white px-3 py-1 rounded flex items-center'>
                  <i className='fas fa-comment mr-1'></i> Comment
                </button>
                <button className='bg-red-600 text-white px-3 py-1 rounded flex items-center'>
                  <i className='fas fa-share mr-1'></i> Share
                </button>
              </div>
            </div>

            {/* POST-02 */}
            <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-4'>
              <div className='flex items-center'>
                <div className='ml-4 flex-grow'>
                  <div className='flex justify-between items-center'>
                    <img
                      src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEBISEBAQFRAQEBIQEBYVEA8PFRUTFRUYFhcVFRUYHSgiGholHhYTIjEhJSkrLi4uFx82ODMsNygtLisBCgoKDg0OGhAQGy0lICUrLS8tLi4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUCAwYBBwj/xAA9EAACAQMBBQQIAwcDBQAAAAAAAQIDBBEhBRIxQVEGYXGBBxMiMpGhscFS0fBCYnKCkqLhIzPxFBUks8L/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAwQBAgUG/8QALhEBAAICAQMCBQMFAAMAAAAAAAECAxEEEiExBVETMkFhgSIjcTORobHRQsHw/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa5V4LjKK80Zisy1m9Y8y1u9p/jXzNvh29mvxae4r6n+JfBj4dvY+NT3ZxuIPhOPxRiazH0bRes+JbTVsAAAAAAAAAAAAAAAAAAAAAAAAGivdQhxevRas2rSbeGlsla+UCttOT91JL4smjFH1VrciZ8IlStKXvSb8/sSRWI8IZvafMtZs1AAADOFSS4NrweDExE+W0WmPCVR2lNe9iS+DIpxRPhLXkWjyn0L2EueH0ehFak1WaZa2STRIAAAAAAAAAAAAAAAAAADGc0llvCQiNsTMRG5Vd1tFvSGi683+RYri15VMmeZ7VQSVXeGQA9wAwB4AAAAAEy1v5R0lrH5rwZFbFE+E9M017StqVWMlmLyivMTHaVutotG4ZmGwAAAAAAAAAAAAAABrrVVFZlw/WiMxEzOoa2tFY3KlurmU3rw5LoWqUiqjkyTeWg3RgFdt3blC0p+srzwnpCK1nN9Ix5+PBcyPJkrSNynwce+e3TSHzHbPpHvKraobtCnywlUqNd8pLC8l5lC/KvPjs72H0rDT5/1T/hzNxte6m8zubiT761Vr4ZwQTe0+ZX64MVfFY/tDXDaNeLzGvXT7q1WP0Zjrt7szixz5rH9oWll2x2jSxu3VSSXKpu1k/FzTfzJK58kfVBfgce/mv9uzptl+lKosK6t4yXOVJuD/AKJNp/1IsV5k/wDlChl9HrP9O2v5X0PSRZSlThCFxKdWpCmk4Qik5yUU297v5ZJY5VJnUKVvS8tKza0xqF52i7QW9nTc680nhuEFh1Jtcox+/BE18laR3VMHGyZp1WPz9FpTnlJrg0mvPU3hDManT0yw20K0oPMX49H4mtqxaO7al5rO4XVtcKayuPNdCras1lfpeLRuG41bgAAAAAAAAAAAAYzmkm3wXERG2JmIjcqO6uHOWeS4Lp/kt0p0woZMk3loN0YBC21tSnbW9SvV9ynHOFjMpPSMV3ttLzNb2isblJixzkvFYfB9sbWrXVaVes8zlpFfswhyhHuXzeXzORkyTe25et42CuHHFaoRosAAAB42NMTMR5KVSSlGcW4uDUotPDUk8pp8mjbfT4RdPX80ditN1J4qVG3UklOcnKbSbw228t4WvkbV7zuWmS2o6KQ+wUe3tCpdW1taxlKFSoqc6kouCxuvChF65yo6tLzzperyKzaK1cK/p16Y7ZMnn6Q7MtOYAbKFZxllf8roa2rFo1Lal5rO4XtCqpRUlz+XcVJjU6l0K2i0bhsMNgAAAAAAAAAAAVO07jL3Fwjx72WMVfqp58m56YQCZXAPQPkPpS7SQr1YW1Ge9ToSlKq17sqvu4T57q3teGZPoUOTk32h3PTuNNf1W8z/AKcUUndAAAAB42hENZtEeWDbfBG0REeUU2tbtEPYQx4mJtttTH093R+ju1dXadvjhR360vCMWk/6pQXmWONT9cKHqOX9qY/D7kdN5oAASrC53Ja+7LR93eR5K7hNhv0z9l2VV4AAAAAAAAAANF5W3IN8+C8Taldzppkt012oi25zwyAHP9vdqSt9n1qkHipJRpU2tGpVHu7y70t5+RFmt00lZ4mOMmWIl8IoxXwOXZ6jDET3bGaJ58MFVRtNEVc0fVmma6SRaJ8PQ2AAHjkhENZtEeWqdToSRXSvfLM9ofWvQ/s2nG1ncLWrWqSpy/dhTekV4t5fiuhf41Y6duD6jkmbxT6R/wC3fFlzgAAAutm196GHxjo/DkVcldSvYb9VUsjTAAAAAAAAACp2tVzJR5RWX4v9fMsYY7bU+Rbc6QCZXAAHF+lyDezsrhG5pN+DUo/WSK/I+Re9P/rfiXxmMsFCY271LdMt0ZIjmJhai9ZaZrDJIncKt66l1lP0d38qVOrTVGcatKFVR9ZuTW/FS3WpJLOvU164abVtz2T2lT96zuNPwRVb/wBbZndW3XMfVClsy7XG2ul429Zf/I1Db4lvdlS2LezeI2l289Letj47uB2azefdebM9He0arW/TjRjzdWcc47oQy/jgxN4arHtd2FpWdh66FSdStCrT9bN+zHclmGIwXBbzhq233mK33I6f0QN/9vn3XVRL+im/uzpcb5HF9R/q/h25YUAAAAlbOq7tRdJey/sR5Y3VNgtqy7Kq8AAAAAAAAAOerz3pN9W2XKxqNObed2mWs2agACn7YbNdxY3FJLM5U3Kmus4NTivNxS8yPLXqrMJ+Nk6MtbPz2mc16N6B5POHjjjQD9F3V1StLXfrSUaVvSipP+FKKSXNt4SXVlfW5YcPPtZtm4blZbP3aL9x1KcnJrk96UoxedNEn4s36ax5HkNtdpE9bKnLudOP1jVQ1QfQbGpUlSpyqw3KsoRdSCkpqE2lvRUueHlZI5HN9ru011bVY07awq1t6Cn6xRqzgm21upQi8tYy8tcUbVrE+Rx+3u1G1KttVpXGznGjUg1KX/TXUdxL2t7ebaWMJ69CSK1iR23o1sXS2bQz71XervwqPMf7VA6eCNUhwebfqzT9uzpyZUAAAD1P5GB0VOWUn1SfxKcxp04ncbZGGQAAAAAAGu4liEn0i/oZrG5hredVmXPF1zQAAA9A+D9vNhStr+cIRbp1261BRTeVJ5lBJc4y3lhct052anTZ6HiZfiY4947S52rTlFuM4yjJcVKLi14p6kSysuy9k617bUl+1Xg5fwQe/P8AtjIxM6hh+ga9CE8b8YySkppSSklJcHh80V4nQ5LtP2puYOsrKlTlG2nClcV603CjCrPDUFjWTSeZPRR5smx4JvG5V8vJik6iNyruzvazaDu69C4ha1qdrLFerazlKMYaZqR3vfhHeW9waWdNDa3G1XqrLWnL3aK2h9CKy043tp2grUZunCtTtqcaFSr6+rTnVjOtFJxt4KL0k1JPLzxSw2T4sHXHVKvl5HRbpjyhbAvdoXdpTp3UVKntGnVh6yMJU3SjBx9bGpq/ehKSjJftaNcyeOLHXGkE82eiZmH0CnBRSjFJRilGKXBJLCSOjDjTMzO5emWAAAAAXmzpZpx7sr4MqZI/VK/hndISTRKAAAAAAAj7Qf8Apy8Pub4/mhHl+SVEW3PAAAABC2hGOYzcYucIy3XhZSljKT5Zws+By/UbeIdr0mm+qXN9ptiU76hKLjFXEE3Qnwal+Fv8L4NefFFDHk1Lr3oovRJsCSdS8qxaftUKKaw9HipLHit3ykWclvorvphCyxq04ypzpThGVKp78WtH36a50Wq6IkpltSdwiyYaZI1ZF2Nsm3tYyja0adJT9/dTba6a8F4G9+Re0aR04uOs78/ymECy116EJx3akITjnexKMZLPDKzwfeSUy2p8sosmGmT5obY6KMUkoxWIxilGKXRJaImwZbTliZlX5OGsYJiseO706zhAAAAAAXGyX/p/zP7FXL8y7x/kTSNOAAAAAAAj7Q/25eC+qN8fzQjy/JKiLbngAAAA1XNLeX64FLmYPiV3HmHQ9P5MYr6t4lTypuEk+WdH9jia09NExMLiikorCSXdoTx4VJ8szLAAAw9ZH8S170Y3DPTIqizhdMvuG++jU62zRY40bywqcy3ThsyOy8+AAAAABcbJ/wBv+Z/YrZfmXeP8iaRJwAAAAAAGq6jmEl+6/obVnUw1vG6zDny45oAAAAAGmrQzqihyOFF56qdpdPi+ozjr037wW7zH+GTizmxGtx7OvM71PvG2wyAEO+2pb0XFVq1Om5JuO/JQzjjhvy+JnUy2rjtb5Y2hz2/s5LLu7RJ9a1JfcfD+ze1clfMTCVsvaNvWTdtUjOMXhyhmUM9N/g3qtM51HT0opmZ8p8S9wqebOV6lk8U/L06LlAAAAAAXezY4px78v5lTJP6l/DGqQlGiUAAAAAAAA52rDEmujaLsTuNuZaNTMMDLAAAAAAEClX3Kks+7JtP46M8/lnpzWj7vVYa9eCkx51Cc481qnwZljbwwyg7Y2VSuaTpVVlcYtaShLlKL5P6mYnTfHktSdw+e3vo/u1Jxg6VSm+Dctx4/ei+Hk2SReF+OXjtH6odp2M2G7O0jRk4ubnOpPdy1mT0Sb44Sis9xpe252595jqnXhfI7OGnRSIeZ5GT4mSbBKhAAAAB6B0NGGIpdEkUpnc7dOsaiIZmGQAAAAAAACn2rSxPPKS+a/SLGKdxpS5FdW2hEyAAAAAAwa2qa+s3hp5enNHnuTMTltr3et4e4wV37MqVedN4+KeqI4tNUtqVvG06ldU5c919Hw+JLF6ygtjtX7tzgzbTXbEwy9SJsOOb3iFfk5Yx45l6dp50AAAAACTYUt6oui9p+X6RHknVUuGvVZeFVfAAAAAAAAAEa/o70HjitUb0tqUWWnVVRltQAAACHtC/jTWOM3wX3ZR5nNrx415t7f9X+Fwbcid+K+/8AxRXN3Un70njotF8Dz2blZc0/rn8fR6PBxMWGP0R+fqlWb9mP65m+L5YS2XVWkpcV+ZbmsSpxaY8IVWzkuGq+ZFNJhPXLE+WqFacODa7v8MxEzDaa1t5YXO1qqeFu8OO6skeTkXrOoYjBRqobZqp+37S8FFrwaJOP6jkxT3jcK3K9Ox5o3E6n/C6tbmNRZi/Fc14o9Bg5FM1eqkvOZ+PfBbpvDaToAAAAAXGy6OI7z4y+nIrZbbnS7gpqu/dNIk4AAAAAAAAAAU20bfdlle7L5PoWcVtxpSzU6Z3CGSoADVdXEYRcnyWi5t8kVuRyseGszM9/ZZ4/FyZrRFY7e7lqtRyk5SereWeUyZLZLTa3mXrseOuOsUr4hiaN1zY2jlRjKOrTkmvBvh8jp4OPN8MXqpZOTFMk0utWSzEx5RxMT4DDLxoCu25arcVTg4tR/lf+SLlYP2viff8Aw2wZ95fhqM5q822tw6clJea6roT8fPbDeL1Qcjj1z45pZ1NOopJSXBrKPW47xesWr4l4/JSaWmtvMMjdoAAJFnb78sclrLw6Ed7dMJMVOqy8SKroPQAAAAAAAAAABhWpKUWnwZmJ1O4a2rFo1Lnb1+rluyzniu9dTTk+o48HadzPs0wen5Ms9u0e6BUuZPuXd+ZxM/qmfL2iemPt/wBdfD6bhx957z9/+KnaNXLUemr8f19SjHfvLpViIjsiGzYA6vstTUqEtcONSS8mov8AM7npt/2pj7uN6hX93f2WNShJcVn5nRmK28qMTavhpdNdPqRzgxz9EkcjJH1ZQo9Fn5m1cVK+Ia2y3t5lne7P36NSL96UXu9zWq+aRFyafExzVvx7/DyRZwaPMvRNjoy/DL4Mbg2n7KupJOOeGqXHx/XeT4uZmwfJPb2+ipyOHizd7R391tTu0+OnzR18HrGO3bJGv9ONn9KvXvjnf+0hPPA61L1vG6zuHLtS1Z1aNSzpwcmklqzaZiI3LFazadQvLWgoRwuPFvqypa3VO3QpSKxpuNW4AAAAAAAAAAAAEa/so1Y4lxXuvmn+RX5HHrmrqfwlw5bY7bhyl1bSpy3ZrXk+TXVHnc2G+K3TZ2cWWuSN1aFFZzhZfFkaV60GEC9tklvRXivubVltErvsXPStHpuS+O8n9Edn0y3zR/Dm+ox3rP8ALpjquYAAAHBXNvuXU4clUk14Nby+TR5nk06Mlo+70OG/ViifsllVsx9Ws5ws8MjbLIMNttGbklDLk+S+5Y42TNW+sU9//vKDkY8Vqfux2dXY2m4tcObXtP7LuPTdd7Vjq8uDGOlZnpSg3AAAAAAAAAAAAAAANN1bQqR3ZrK5dU+qZFlw0y16bQ3x5LUndXN7Q2VOnqvah1S1XivucLkcK+LvHeHVw8quTtPaVeU1p5KOU0+awGWzshPFecXzpv4xkvzZ1fTbayTHvCn6hXeOJ+7rztuOAAAHH7cji9f70Yv+zH2PP+oxrNP4dvhTvDDE56wATLHZ1Sq9FiPOT4eXUs8fiZM3jx7oM3Ipj/n2dLY2UKSxFavi3xZ3sHHphjVf7uTlzWyTuUknRAAAAAAAAAAAAAAAAAAArrzY9Oeq9iXVcPNFHPwMeTvHaVnFy707eYU1zsetDgt5dY6/LicvLwM1PEbj7L+Pl47eeyu2RmF9FPTe3lh6cYN/U34MzXNWJb8rVsEzDsz0LhgAABynaSP/AJdPvpr6zRwvUo/d/DscGf2Z/luttlVp8I7q6y9n5cSti4WbJ9Nfy3ycrHT67/hcWew6cdZ+2/hH4c/M6eH07HTvfvP+FHLzL27V7QtEjoRGlN6ZAAAAAAAAAAAAAAAAAAAAAADCdOLabim1qspPHgY1E92dy93EZYeerQ2Hq0Nj3cQBQWc4WcYzhZx4mNRvZtkZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z'
                      alt='Jane Doe'
                      className='w-20 h-20 rounded-full'
                    />
                    <div>
                      <h3 className='text-lg font-semibold text-white'>
                        Jane Doe
                      </h3>
                      <p className='text-gray-300'>Program Manager@GSSOC</p>{' '}
                    </div>
                    <button
                      className={`px-4 py-1 rounded text-white ${
                        isConnected ? 'bg-primary-darker' : 'bg-primary'
                      }`}
                      onClick={handleClick}
                    >
                      {isConnected ? 'Pending' : 'Connect+'}
                    </button>
                  </div>
                  <p className='text-gray-300 mt-8 text-left'>
                    🚀 𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝘁𝗶𝗼𝗻 𝗢𝗽𝗲𝗻𝗶𝗻𝗴 𝗦𝗼𝗼𝗻! 🚀 <br/>
                    Registrations for Campus
                    Ambassadors, Contributors, Mentors, and Project Admins will
                    be opening soon! This is your chance to get involved,
                    contribute to exciting projects, and be a part of the
                    𝗚𝗦𝗦𝗼𝗖'𝟮𝟰 𝗘𝘅𝘁𝗱 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆. 🌟
                  </p>
                  <p></p>
                </div>
              </div>

              {/* Grid for pictures and video */}
              <div className='mt-4'>
                <img
                  src='https://media.licdn.com/dms/image/v2/D5610AQFCjyxCxmUBlg/image-shrink_800/image-shrink_800/0/1726061427859?e=1726740000&v=beta&t=MxaCyKB-Ro-bs-Z2mkzUNBdYmugtrUfalv__-nzUfkk'
                  alt='Pic 1'
                  className='w-full h-auto rounded-lg'
                />
              </div>

              {/* Action Buttons with Icons */}
              <div className='mt-10 flex justify-center space-x-2'>
                <button className='bg-blue-600 text-white px-3 py-1 rounded flex items-center'>
                  <i className='fas fa-thumbs-up mr-1'></i> Like
                </button>
                <button className='bg-green-600 text-white px-3 py-1 rounded flex items-center'>
                  <i className='fas fa-comment mr-1'></i> Comment
                </button>
                <button className='bg-red-600 text-white px-3 py-1 rounded flex items-center'>
                  <i className='fas fa-share mr-1'></i> Share
                </button>
              </div>
            </div>
          </div>

          {/* Write Article Popup */}
          <WriteArticlePopup
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {/* Contact Cards Section */}
          <div className='flex-none w-1/4 bg-black p-4'>
            <div className='flex flex-col space-y-4'>
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className='bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4'
                >
                  <img
                    src={contact.profilePic}
                    alt={contact.name}
                    className='w-16 h-16 rounded-full'
                  />
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-white'>
                      {contact.name}
                    </h3>
                    <p className='text-gray-400'>
                      {contact.company} - {contact.designation}
                    </p>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      contact.isPending
                        ? 'bg-primary-darker text-gray-300'
                        : 'bg-primary text-white'
                    }`}
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
    )
  }

  return (
    <div className='flex h-screen dark:bg-gray-900 dark:text-white bg-white text-black'>
      {/* Main Content Area */}
      <div className='flex-1'>
        {renderContent()}
        {/* Chat Slider */}
        <div
          className={`fixed bottom-0 left-0 z-50 ${
            isChatExpanded ? 'w-1/2 h-3/4' : 'w-full max-w-xs'
          } bg-gray-800 border-t border-gray-700`}
        >
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
              <MessageList
                chats={chats}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
