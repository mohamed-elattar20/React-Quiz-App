const Progress = ({
  index,
  numOfQuestionsToTest,
  score,
  totalPointsOfQuiz,
  answer,
}) => {
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
