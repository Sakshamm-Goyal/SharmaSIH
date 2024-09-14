import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components';
import { useGAEventTracker } from '../hooks';
import Card from "../components/atoms/Card";
import { useTranslation } from '../contexts/TranslationContext'; // Adjust import based on your setup


function Learn() {
  const { translate } = useTranslation();
  const gaEventTracker = useGAEventTracker(translate('video_thumbnail'));

  const [data, setData] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    setTimeout(() => {
      setData([
        { link: "acids_bases", title: translate('acids_bases'), subject: 'chemistry' },
        { link: "ph_scale", title: translate('ph_scale'), subject: 'chemistry' },
        { link: "chemical_indicators", title: translate('chemical_indicators'), subject: 'chemistry' },
        { link: "litmus-paper", title: translate('litmus_paper'), subject: 'chemistry' },
        { link: "acid_base_reactions", title: translate('acid_base_reactions'), subject: 'chemistry' },

        // Biology Topics
        { link: "cell_structure", title: translate('cell_structure'), subject: 'biology' },
        { link: "photosynthesis", title: translate('photosynthesis'), subject: 'biology' },
        { link: "human_digestion", title: translate('human_digestion'), subject: 'biology' },

        // Physics Topics
        { link: "laws_of_motion", title: translate('laws_of_motion'), subject: 'physics' },
        { link: "optics", title: translate('optics'), subject: 'physics' },
        { link: "electrical-circuit", title: translate('electrical_circuit'), subject: 'physics' },

        // Math Topics
        { link: "algebra_basics", title: translate('algebra_basics'), subject:'math' },
        { link: "geometry_shapes", title: translate('geometry_shapes'), subject: 'math' },

        // History Topics
        { link: "ancient_civilizations", title: translate('ancient_civilizations'), subject: 'history' },
        { link: "world_war_ii", title: translate('world_war_ii'), subject: 'history'},

        // Environmental Management Topic
        { link: "environmental_management", title: translate('environmental_management'), subject: 'environmental' },
        { link: "industry", title: translate('Industry Relevant Skills'), subject: 'modular' },

      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      console.log('Data:', data); // Debugging

      let filteredData = data.filter(item =>
        (item.subject === selectedSubject || selectedSubject === 'All') &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log('Filtered Data:', filteredData); // Debugging

      const shuffledArray = [...filteredData];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      setShuffledData(shuffledArray);
    }
  }, [data, searchTerm, selectedSubject]);

  return (
    <>
      <div className="mx-auto mb-32 flex min-h-screen w-[90%] animate-reveal flex-col items-center">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-4xl font-bold mb-8">{translate('explore_educational_topics')}</h1>

        {/* Search and Filter Section */}
        <div className="flex items-center mb-8 space-x-4 w-full max-w-lg">
          <input
            type="text"
            placeholder={translate('search_topics')}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All" className="text-gray-700">{translate('all_subjects')}</option>
            <option value="chemistry" className="text-gray-700">{translate('chemistry')}</option>
            <option value="modular" className="text-gray-700">{translate('modular')}</option>
            <option value="Lok Vidya" className="text-gray-700">{translate('lokvidya')}</option>
            <option value="biology" className="text-gray-700">{translate('biology')}</option>
            <option value="physics" className="text-gray-700">{translate('physics')}</option>
            <option value="math" className="text-gray-700">{translate('math')}</option>
            <option value="history" className="text-gray-700">{translate('history')}</option>
            <option value="environmental" className="text-gray-700">{translate('environmental')}</option>
          </select>
        </div>

        <div className="mx-auto grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {shuffledData.map((video, index) => (
            <Link
              key={index}
              className="w-full"
              to={`/topic/${video.link}`}
              onClick={() => gaEventTracker({ label: video.link })}
            >
              <Card id={video.link} title={video.title} type="video" image={video.image} />
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center text-center text-xl mt-8">
          {!loading && shuffledData.length === 0 && <>{translate('no_data_found')}</>}
          {error && <>{translate('error_occurred')}</>}
          {loading && <>{translate('loading')}</>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Learn;
