import React, { useState } from 'react';
import useQuizData from './useQuizData';
import 'bootstrap/dist/css/bootstrap.min.css';

function QuizHolder({ quizId, goToNextLesson }) {
  const quiz = useQuizData(quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [perfectScore, setPerfectScore] = useState(false);

  if (!quiz) return <div>Loading...</div>;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 === quiz.questions.length) {
      // Check if the user got a perfect score
      if (score + 1 === quiz.questions.length) {
        setPerfectScore(true);
      }
    }

    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {perfectScore && (
          <div style={{ fontSize: '2rem', color: 'green', marginBottom: '10px' }}>
            Well done!!!! <span role="img" aria-label="trophy">🏆</span>
          </div>
        )}
        <div style={{ fontSize: '1.5rem' }}>End of quiz. You scored: {score}/{quiz.questions.length}</div>
        <button
          onClick={goToNextLesson}
          className='btn btn-primary mt-3'
          style={{ cursor: 'pointer' }}
        >
          To Next Lesson
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
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className='btn btn-primary'
          style={{ cursor: 'pointer' }}
        >
          Next question
        </button>
      </div>
    </div>
  );
}

export default QuizHolder;
