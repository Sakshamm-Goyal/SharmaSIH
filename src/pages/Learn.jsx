import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Footer, Thumbnail } from '../components';
import { useGAEventTracker } from '../hooks';

function Learn() {
  const gaEventTracker = useGAEventTracker('Video Thumbnail');

  // Replace useData with dummy data
  const [data, setData] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate loading and error state
    setTimeout(() => {
      setData([
        { link: 'heart', title: 'The Heart: Anatomy and Function' },
        { link: 'reproduction', title: 'Human Reproduction: A Comprehensive Overview' },
        { link: 'dentistry', title: 'Basics of Dentistry: From Teeth to Gums' }
      ]);
      setLoading(false);
    }, 1000); // Simulate 1 second loading
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const shuffledArray = [...data];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      setShuffledData(shuffledArray);
    }
  }, [data]);

  return (
    <>
      <div className="mx-auto mb-32 flex min-h-screen w-[90%] animate-reveal flex-col items-center">
        <h1 className="page-heading">Learn from us</h1>

        <div className="mx-auto grid w-full grid-cols-quizzes justify-items-center gap-5">
          {shuffledData.map((video, index) => (
            <Link
              key={index}
              className="w-full"
              to={`/topic/${video.link}`} // Navigate to different component with topic name
              onClick={() => gaEventTracker({ label: video.link })}
            >
              <Thumbnail id={video.link} title={video.title} type="video" />
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center text-center text-xl">
          {!loading && shuffledData.length === 0 && <>No data found! </>}
          {error && <>There was an error! </>}
          {loading && <>Loading ...</>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Learn;
