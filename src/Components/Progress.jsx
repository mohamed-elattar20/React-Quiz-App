import { useQuiz } from "../Contexts/QuizContext";

const Progress = () => {
  const {
    questions,
    numOfQuestionsToTest,
    status,
    index,
    answer,
    score,
    highScore,
    secondsRemain,
    dispatch,
    numOfQuestions,
    totalPointsOfQuiz,
  } = useQuiz();
  return (
    <>
      <head className="progress">
        <progress
          max={numOfQuestionsToTest}
          value={index + Number(answer !== null)}
        />
        <p>
          Question <strong>{index + 1}</strong> / {numOfQuestionsToTest}
        </p>
        <p>
          {score} / {totalPointsOfQuiz}
        </p>
      </head>
    </>
  );
};

export default Progress;
