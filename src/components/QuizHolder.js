import React, { useState } from 'react';
import {useQuizData} from '../firebase';

function QuizHolder({ quizId }) {
  const quiz = useQuizData(quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!quiz) return <div>Loading...</div>;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const question = quiz[`question${currentQuestionIndex + 1}`];
  const answers = [quiz[`answer1`], quiz[`answer2`], quiz[`answer3`], quiz[`answer4`],];

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            <input
              type="radio"
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => handleAnswerSelect(answer)}
            />
            {answer}
          </li>
        ))}
      </ul>
      <button
        onClick={handleNextQuestion}
        disabled={!selectedAnswer}
      >
        Next
      </button>
    </div>
  );
}

export default QuizHolder;
