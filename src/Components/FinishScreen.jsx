import { useQuiz } from "../Contexts/QuizContext";

const FinishScreen = () => {
  const {
    score,
    highScore,

    dispatch,

    totalPointsOfQuiz,
  } = useQuiz();
  const percentage = Math.ceil((score / totalPointsOfQuiz) * 100);
  return (
    <>
      <p className="result">
        You Scored <strong>{score}</strong> out of {totalPointsOfQuiz} (
        {percentage} %)
      </p>
      <p className="highscore">(Highscore : {highScore} points)</p>
      <button
        onClick={() => dispatch({ type: "restartQuiz" })}
        className="btn btn-ui"
      >
        Restart The Quiz
      </button>
    </>
  );
};

export default FinishScreen;
