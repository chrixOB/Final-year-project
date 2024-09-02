import React, { useState, useEffect } from 'react';
import useQuizData from './useQuizData';
import 'bootstrap/dist/css/bootstrap.min.css';

function QuizHolder({ quizId, goToNextLesson }) {
  const quiz = useQuizData(quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [perfectScore, setPerfectScore] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Reset the state when the quizId changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers({});
    setScore(0);
    setPerfectScore(false);
    setQuizFinished(false);
  }, [quizId]);

  useEffect(() => {
    // When currentQuestionIndex changes, update selectedAnswer to the saved answer
    if (userAnswers[currentQuestionIndex] !== undefined) {
      setSelectedAnswer(userAnswers[currentQuestionIndex]);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentQuestionIndex]);

  if (!quiz) return <div>Loading...</div>;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Save the selected answer for the current question
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedAnswer,
      }));

      const currentQuestion = quiz.questions[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }

    if (currentQuestionIndex + 1 === quiz.questions.length) {
      // Check if the user got a perfect score
      if (score + (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer ? 1 : 0) === quiz.questions.length) {
        setPerfectScore(true);
      }
    }

    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePreviousQuestion = () => {
    if (selectedAnswer) {
      // Save the selected answer for the current question
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedAnswer,
      }));
    }

    setSelectedAnswer(userAnswers[currentQuestionIndex] || null);
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
  };

  const handleGoToNextLesson = () => {
    setQuizFinished(false);
    goToNextLesson();
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (quizFinished) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {perfectScore && (
          <div style={{ fontSize: '2rem', color: 'green', marginBottom: '10px' }}>
            Well done!!!! <span role="img" aria-label="trophy">🏆</span>
          </div>
        )}
        <div style={{ fontSize: '1.5rem' }}>End of quiz. You scored: {score}/{quiz.questions.length}</div>
        <button
          onClick={handleGoToNextLesson}
          className='btn btn-primary mt-3'
          style={{ cursor: 'pointer' }}
        >
          Go to Next Lesson
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '1.5rem' }}>End of quiz. You scored: {score}/{quiz.questions.length}</div>
        <button
          onClick={handleGoToNextLesson}
          className='btn btn-primary mt-3'
          style={{ cursor: 'pointer' }}
        >
          Go to Next Lesson
        </button>
      </div>
    );
  }

  const { question, answers } = currentQuestion;

  return (
    <div>
      <h2>{question}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {answers && answers.length > 0 ? (
          answers.map((answer, index) => (
            <div
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              style={{
                padding: '10px 20px',
                margin: '10px 0',
                borderRadius: '5px',
                border: selectedAnswer === answer ? '2px solid #007bff' : '1px solid #ddd',
                backgroundColor: selectedAnswer === answer ? '#007bff' : '#f8f9fa',
                color: selectedAnswer === answer ? '#fff' : '#000',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s, border 0.3s',
              }}
            >
              {answer}
            </div>
          ))
        ) : (
          <li>No answers available.</li>
        )}
      </ul>
      <div className='d-flex justify-content-center mt-3'>
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className='btn btn-secondary'
          style={{ cursor: 'pointer', marginRight: '10px' }}
        >
          Previous Question
        </button>
        {currentQuestionIndex + 1 === quiz.questions.length ? (
          <button
            onClick={handleFinishQuiz}
            className='btn btn-success'
            style={{ cursor: 'pointer', marginRight: '10px' }}
          >
            Finish Quiz
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className='btn btn-primary'
            style={{ cursor: 'pointer', marginRight: '10px' }}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizHolder;
