import React, { useState, useEffect } from 'react';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/internships');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className='flex dark:bg-black bg-white'>
      <div className='w-3/4 p-20'>
        {/* Search Bar */}
        <input
          type='text'
          placeholder='Search for jobs...'
          className='w-full p-2 bg-primary text-white dark:bg-gray-800 dark:text-gray-300 rounded-lg mb-4'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {/* Job Listings */}
        <div>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div
                key={index}
                className='mb-4 flex items-center rounded-lg bg-primary p-4 dark:bg-gray-800'
              >
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    {job.title}
                  </h3>
                  <p className='text-gray-300'>{job.organization}</p>
                  <p className='text-gray-200 mt-2'>{job.location}</p>
                  <p className='text-gray-200 mt-2'>
                    {job.applicationDeadline ? `Deadline: ${new Date(job.applicationDeadline).toLocaleDateString()}` : ''}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-900'>No jobs found</p>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className='w-1/4 bg-primary p-20 dark:bg-gray-800 border-gray-900'>
        <h2 className='text-white text-xl font-bold text-center mb-4'>
          MY BADGES
        </h2>
        {/* Badges Container */}
        <div className='flex flex-col items-center'>
          <img src='https://gssoc.girlscript.tech/badges/1.png?imwidth=256' alt='GSSoC Badge 1' className='w-3/4 mb-4' />
          <img src='https://gssoc.girlscript.tech/badges/2.png?imwidth=256' alt='GSSoC Badge 2' className='w-3/4 mb-4' />
          <img src='https://gssoc.girlscript.tech/badges/3.png?imwidth=256' alt='GSSoC Badge 3' className='w-3/4 mb-4' />
          <img src='https://gssoc.girlscript.tech/badges/4.png?imwidth=256' alt='GSSoC Badge 4' className='w-3/4 mb-4' />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
