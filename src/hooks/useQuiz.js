import { useEffect, useState } from 'react';

export default function useQuiz(topicID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    // Fetch question-answer sets from QuizzyDatabase.json
    async function fetchQuestions() {
      try {
        setError(false);
        setLoading(true);

        // Fetch the quiz data from the local JSON file
        const response = await fetch(`/QuizzyDatabase.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();

        setLoading(false);

        // Check if the data has the expected structure
        if (data && data.quizzes && data.quizzes[topicID] && data.quizzes[topicID].questions) {
          setQuiz(data.quizzes[topicID].questions);
        } else {
          setError(true);
        }
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [topicID]);

  return { loading, error, quiz };
}
