const FinishScreen = ({ score, totalPointsOfQuiz, highScore, dispatch }) => {
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
