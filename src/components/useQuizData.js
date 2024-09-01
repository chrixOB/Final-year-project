import { useEffect, useState } from "react";
import { quizzes } from "../quizzes"; // Import the quizzes object

function useQuizData(quizId) {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fetch the quiz data from the quizzes object
    const fetchQuizData = () => {
      setQuiz(quizzes[quizId]);
    };

    fetchQuizData();
  }, [quizId]);

  return quiz;
}

export default useQuizData;
