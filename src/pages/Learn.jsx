import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components';
import { useGAEventTracker } from '../hooks';
import Card from "../components/atoms/Card";
import { useTranslation } from '../contexts/TranslationContext';  // Adjust import based on your setup


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
        // Chemistry Topics
        { link: "acids_bases", title: "Acids and Bases: Introduction and Properties", subject: "Chemistry",   },
        { link: "ph_scale", title: "The pH Scale: Measuring Acidity and Alkalinity", subject: "Chemistry",  },
        { link: "chemical_indicators", title: "Chemical Indicators: Litmus Paper and Others", subject: "Chemistry",  },
        { link: "litmus_paper", title: "Litmus Paper: How It Works and Its Uses", subject: "Chemistry",  },
        { link: "acid_base_reactions", title: "Acid-Base Reactions: Neutralization and Indicators", subject: "Chemistry", },
        { link: "acids_bases", title: translate('acids_bases'), subject: translate('chemistry') },
        { link: "ph_scale", title: translate('ph_scale'), subject: translate('chemistry') },
        { link: "chemical_indicators", title: translate('chemical_indicators'), subject: translate('chemistry') },
        { link: "litmus-paper", title: translate('litmus_paper'), subject: translate('chemistry') },
        { link: "acid_base_reactions", title: translate('acid_base_reactions'), subject: translate('chemistry') },

        // Biology Topics
        { link: "cell_structure", title: "Cell Structure and Function", subject: "Biology" },
        { link: "photosynthesis", title: "Photosynthesis: The Process of Energy Conversion", subject: "Biology" },
        { link: "human_digestion", title: "Human Digestion: How the Digestive System Works", subject: "Biology"  },
        { link: "cell_structure", title: translate('cell_structure'), subject: translate('biology') },
        { link: "photosynthesis", title: translate('photosynthesis'), subject: translate('biology') },
        { link: "human_digestion", title: translate('human_digestion'), subject: translate('biology') },

        // Physics Topics
        { link: "laws_of_motion", title: "Newton's Laws of Motion", subject: "Physics", },
        { link: "optics", title: "Optics: The Study of Light", subject: "Physics",  },
        { link: "laws_of_motion", title: translate('laws_of_motion'), subject: translate('physics') },
        { link: "optics", title: translate('optics'), subject: translate('physics') },
        { link: "electrical-circuit", title: translate('electrical_circuit'), subject: translate('physics') },

        // Math Topics
        { link: "algebra_basics", title: "Algebra Basics: Understanding Variables and Equations", subject: "Math", },
        { link: "geometry_shapes", title: "Geometry: Shapes and Their Properties", subject: "Math", },
        { link: "algebra_basics", title: translate('algebra_basics'), subject: translate('math') },
        { link: "geometry_shapes", title: translate('geometry_shapes'), subject: translate('math') },

        // History Topics
        { link: "ancient_civilizations", title: "Ancient Civilizations: Mesopotamia and Egypt", subject: "History", },
        { link: "world_war_ii", title: "World War II: Major Events and Impacts", subject: "History",  },
        { link: "ancient_civilizations", title: translate('ancient_civilizations'), subject: translate('history') },
        { link: "world_war_ii", title: translate('world_war_ii'), subject: translate('history') },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter(item =>
        (item.subject === selectedSubject || selectedSubject === 'All') &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
            <option value="Chemistry" className="text-gray-700">{translate('chemistry')}</option>
            <option value="Biology" className="text-gray-700">{translate('biology')}</option>
            <option value="Physics" className="text-gray-700">{translate('physics')}</option>
            <option value="Math" className="text-gray-700">{translate('math')}</option>
            <option value="History" className="text-gray-700">{translate('history')}</option>
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
