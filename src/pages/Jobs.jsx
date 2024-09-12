import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Filter the jobs safely
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <p className='text-gray-200 mt-2'>{job.remote ? 'Remote' : 'Onsite'}</p>
                  <p className='text-gray-300 text-xs mt-5'>{job.datePosted}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-400'>No jobs found</p>
          )}
        </div>
      </div>
      
      {/* Sidebar */}
      <div className='w-1/4 bg-primary p-20 dark:bg-gray-800 border-gray-700'>
        <h2 className='text-white text-lg font-bold mb-4'>My Badges</h2>
        
        {/* Badges Container */}
        <div className='h-1/2'>
          <img
            src="https://via.placeholder.com/100"
            alt="Badge 1"
            className="w-full mb-4"
          />
          <img
            src="https://via.placeholder.com/100"
            alt="Badge 2"
            className="w-full mb-4"
          />
          <img
            src="https://via.placeholder.com/100"
            alt="Badge 3"
            className="w-full mb-4"
          />
          <img
            src="https://via.placeholder.com/100"
            alt="Badge 4"
            className="w-full mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
