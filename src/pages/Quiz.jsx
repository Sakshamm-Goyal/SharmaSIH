import _ from 'lodash';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import quizData from '../../src/data/quizData.json'; // Adjust path as necessary
import { PageNotFound } from './';
import { AnswerBox, ProgressBar, Rules } from '../components';
import { useAuth } from '../contexts/AuthContext';

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case 'quiz': {
      const qnaSet = _.cloneDeep(action.value);
      qnaSet.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return qnaSet;
    }
    case 'answer': {
      const question = _.cloneDeep(state);
      question[action.questionID].options[action.optionIndex].checked = action.value;
      return question;
    }
    default:
      return state;
  }
};

function Quiz() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qnaSet, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const date = useMemo(() => new Date(), []);

  useEffect(() => {
    // Use the imported quizData directly
    try {
      setLoading(true);
      setError(false);

      // Ensure data structure is correct
      const data = quizData;

      if (data && data.quizzes && data.quizzes[id] && data.quizzes[id].questions) {
        setQuiz(data.quizzes[id].questions);
        dispatch({ type: 'quiz', value: data.quizzes[id].questions });
      } else {
        setError(true);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error processing quiz data:', error);
      setError(true);
      setLoading(false);
    }
  }, [id]);

  // Answer option selection
  const handleAnswerChange = useCallback(
    (e, index) => {
      dispatch({
        type: 'answer',
        questionID: currentQuestion,
        optionIndex: index,
        value: e.target.checked,
      });
    },
    [dispatch, currentQuestion]
  );

  // Get next question
  const nextQuestion = useCallback(() => {
    if (currentQuestion < qnaSet.length - 1) setCurrentQuestion((curr) => curr + 1);
  }, [currentQuestion, qnaSet]);

  // Get previous question
  const previousQuestion = useCallback(() => {
    if (currentQuestion >= 1 && currentQuestion <= qnaSet.length)
      setCurrentQuestion((curr) => curr - 1);
  }, [currentQuestion, qnaSet]);

  // Progress percentage
  const progressPercentage = qnaSet?.length > 0 ? ((currentQuestion + 1) * 100) / qnaSet.length : 0;

  // Submit Quiz and handle logic here (without Firebase)
  const submitQuiz = useCallback(async () => {
    function getMarkSheet() {
      let correctAnswersCount = 0;
      let incorrectAnswersCount = 0;
      let unattemptedCount = 0;

      qnaSet?.forEach((question) => {
        const correctIndexes = [];
        const checkedIndexes = [];

        question.options.forEach((option, index2) => {
          if (option.correct) correctIndexes.push(index2);
          if (option.checked) checkedIndexes.push(index2);
        });

        if (checkedIndexes.length === 0) unattemptedCount += 1;
        else if (_.isEqual(correctIndexes, checkedIndexes)) correctAnswersCount += 1;
        else incorrectAnswersCount += 1;
      });

      const noq = qnaSet?.length;
      const obtainedPoints = correctAnswersCount * 10 - incorrectAnswersCount * 2;
      const obtainedPercentage = obtainedPoints / (0.1 * noq);

      return [
        noq,
        correctAnswersCount,
        incorrectAnswersCount,
        unattemptedCount,
        obtainedPoints,
        obtainedPercentage
      ];
    }

    const [
      noq,
      correctAnswersCount,
      incorrectAnswersCount,
      unattemptedCount,
      obtainedPoints,
      obtainedPercentage
    ] = getMarkSheet();

    const markSheetObject = {
      topicId: id,
      date: date.toLocaleDateString('en-IN'),
      time: `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')} ${
        date.getHours() < 12 ? 'AM' : 'PM'
      }`,
      noq: noq,
      correctAnswersCount: correctAnswersCount,
      incorrectAnswersCount: incorrectAnswersCount,
      unattemptedCount: unattemptedCount,
      obtainedPoints: obtainedPoints,
      obtainedPercentage: obtainedPercentage,
      qnaSet: { ...qnaSet }
    };

    // You can handle local storage or another storage solution here
    console.log('Quiz submitted:', markSheetObject);

    // Navigate to the result page
    navigate(`/result/${id}`, { state: { qnaSet, markSheetObject } });
  }, [id, navigate, qnaSet, date]);

  return (
    <>
      {loading && <p className="page-heading text-lg">Loading ...</p>}
      {error && <PageNotFound />}
      {!loading && !error && qnaSet && qnaSet?.length === 0 && <PageNotFound />}
      {!loading && !error && qnaSet && qnaSet?.length > 0 && (
        <div className="mx-auto w-[85%] animate-reveal">
          <h1 className="page-heading">{id.split('-').join(' ')} Quiz!</h1>
          <Rules />
          <div className="card mb-40 flex flex-col justify-center rounded-md p-3">
            <div className="flex flex-col items-center justify-center text-xl font-bold text-black dark:text-white sm:text-3xl">
              Q. {qnaSet[currentQuestion].title}
            </div>

            <hr className="mb-8 mt-3 h-px border-0 bg-primary" />

            <AnswerBox
              input
              handleChange={handleAnswerChange}
              options={qnaSet[currentQuestion].options}
            />
          </div>

          <ProgressBar
            nextQ={nextQuestion}
            prevQ={previousQuestion}
            progress={progressPercentage}
            submit={submitQuiz}
          />
        </div>
      )}
    </>
  );
}

export default Quiz;
