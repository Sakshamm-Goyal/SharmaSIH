import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Recommendation Component
function Recommendation() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to change the loading state after 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clear the timer if the component is unmounted before the timer finishes
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (subject) => {
    navigate('/learn');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      {loading ? (
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg text-black dark:text-white flex flex-col items-center">
          <p className="text-xl font-semibold mb-4">Please wait while we recommend you courses...</p>
          <div className="loader"></div>
          <style jsx>{`
            .loader {
              border: 4px solid rgba(0, 0, 0, 0.1);
              border-left: 4px solid ${'rgb(16, 252, 0)'};
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg text-black dark:text-white">
          <h2 className="text-3xl font-bold mb-4 text-center">Congratulations!</h2>
          <p className="text-xl mb-6 text-center">We Recommend You:</p>
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleClick('Biology')}
              className="flex items-center gap-2 text-xl font-semibold mb-4 px-6 py-2 bg-[rgb(16,252,0)] text-white rounded-lg shadow-md hover:bg-[rgba(24,160,139,0.8)]"
            >
              🌿 Biology
            </button>
            <div className="flex justify-between w-full max-w-sm">
              <button
                onClick={() => handleClick('Physics')}
                className="flex items-center gap-2 text-lg font-medium px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                ⚛️ Physics
              </button>
              <button
                onClick={() => handleClick('Chemistry')}
                className="flex items-center gap-2 text-lg font-medium px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                🧪 Chemistry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// Main PostSignInPage Component
function PostSignInPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    ageGroup: '',
    gender: '',
    educationLevel: '',
    careerStage: '',
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNextStep = () => {
    if (isStepValid()) {
      setStep((prevStep) => Math.min(prevStep + 1, 5));
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSelect = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const toggleInterest = (interest) => {
    setAnswers((prev) => {
      const updatedInterests = prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updatedInterests };
    });
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return answers.ageGroup !== '';
      case 2:
        return answers.gender !== '';
      case 3:
        return answers.educationLevel !== '';
      case 4:
        return answers.careerStage !== '';
      case 5:
        return answers.interests.length > 0;
      default:
        return false;
    }
  };

  const allInterests = [
    'Engineering',
    'Arts',
    'Science',
    'Technology',
    'Business',
    'Design',
    'Healthcare',
    'Education',
    'Finance',
    'Marketing',
    'Entrepreneurship',
    'Data Science',
    'AI & Machine Learning',
    'Robotics',
    'Environmental Science',
    'Music',
    'Film & Media',
    'Psychology',
    'Law',
    'Social Sciences',
    'Sports',
    'Fitness & Nutrition',
    'Languages',
    'History',
    'Culinary Arts',
  ];

  const sortedInterests = [
    ...answers.interests,
    ...allInterests.filter((interest) => !answers.interests.includes(interest)),
  ];

  if (submitted) {
    return <Recommendation answers={answers} />;
  }

  return (
    <div className="mt-36 flex animate-reveal flex-col items-center justify-center xl:mt-28">
      <div className="mx-8 flex flex-col items-center justify-center gap-2">
        <h1 className="page-heading my-8 mt-10 text-center text-3xl font-bold uppercase text-black dark:text-white md:text-5xl">
          Welcome!
          <span className="my-1 block text-center text-primary drop-shadow-2xl">
            We Have a Few Questions for You
          </span>
        </h1>
        <p className="rounded-lg bg-primary px-4 py-2 text-center font-semibold uppercase tracking-wide text-black dark:text-white md:text-xl">
          This will help us recommend courses!
        </p>
      </div>

      <div className="mt-8 w-[90%] max-w-2xl rounded-lg bg-white p-10 shadow-lg">
        <div className="text-black dark:text-white">
          {step === 1 && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg font-medium text-black dark:text-black">Select Your Age Group:</p>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.ageGroup === '<18'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(16,252,0,0.1)]'
                  }`}
                  onClick={() => handleSelect('ageGroup', '<18')}
                >
                  {'<18'}
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.ageGroup === '18-22'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('ageGroup', '18-22')}
                >
                  18-22
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.ageGroup === '>22'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('ageGroup', '>22')}
                >
                  {'>22'}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg font-medium text-black dark:text-black">Select Your Gender:</p>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.gender === 'Male'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('gender', 'Male')}
                >
                  Male
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.gender === 'Female'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('gender', 'Female')}
                >
                  Female
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.gender === 'Other'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('gender', 'Other')}
                >
                  Other
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg font-medium text-black dark:text-black">What is Your Current Education Level?</p>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.educationLevel === 'High School'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('educationLevel', 'High School')}
                >
                  High School
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.educationLevel === 'Undergraduate'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('educationLevel', 'Undergraduate')}
                >
                  Undergraduate
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.educationLevel === 'Postgraduate'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('educationLevel', 'Postgraduate')}
                >
                  Postgraduate
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg font-medium text-black dark:text-black">What Stage Are You in Your Career?</p>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.careerStage === 'Student'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('careerStage', 'Student')}
                >
                  Student
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.careerStage === 'Entry Level'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('careerStage', 'Entry Level')}
                >
                  Entry Level
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.careerStage === 'Mid Career'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('careerStage', 'Mid Career')}
                >
                  Mid Career
                </button>
                <button
                  className={`px-6 py-3 rounded-md ${
                    answers.careerStage === 'Senior Level'
                      ? 'bg-[rgb(4,231,98)] text-white'
                      : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                  }`}
                  onClick={() => handleSelect('careerStage', 'Senior Level')}
                >
                  Senior Level
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg font-medium text-black dark:text-black">Select Your Interests:</p>
              <div className="flex flex-wrap gap-4">
                {sortedInterests.map((interest) => (
                  <button
                    key={interest}
                    className={`px-6 py-3 rounded-md ${
                      answers.interests.includes(interest)
                        ? 'bg-[rgb(4,231,98)] text-white'
                        : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-[rgba(24,160,139,0.1)]'
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              className="px-6 py-3 rounded-md bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300"
              onClick={handlePreviousStep}
            >
              Back
            </button>
          )}
          <button
            className={`px-6 py-3 rounded-md ${
              isStepValid() ? 'bg-[rgb(4,231,98)] text-white' : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
            }`}
            onClick={() => {
              if (step === 5) {
                setSubmitted(true);
              } else {
                handleNextStep();
              }
            }}
            disabled={!isStepValid()}
          >
            {step === 5 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostSignInPage;
