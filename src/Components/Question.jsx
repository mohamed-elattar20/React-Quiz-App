const Question = ({ question, dispatch, answer }) => {
  //   console.log(question);
  const isAnswered = answer !== null;
  return (
    <>
      <div>
        <h4>{question?.question}</h4>
        <div className="options">
          {question?.options?.map((option, index) => (
            <button
              disabled={isAnswered}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
              key={option}
              className={`btn btn-option ${index === answer ? "answer" : ""} ${
                isAnswered
                  ? index === question?.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
