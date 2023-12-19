import { useState } from "react";

const StartScreen = ({ numOfQuestions, dispatch, numOfQuestionsToTest }) => {
  const [select, setSelect] = useState("");
  return (
    <>
      <div className="start">
        <h2>Welcome to The React Quiz!</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            style={{
              fontSize: "2rem",
              marginRight: "1rem",
              fontWeight: "bold",
            }}
          >
            Choose Number of Questions
          </label>
          <select
            onChange={(e) =>
              dispatch({
                type: "setNumOfQuestions",
                payload: Number(e.target.value),
              })
            }
            value={numOfQuestionsToTest}
            className="btn btn-ui"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <h3> {numOfQuestionsToTest} questions to test your React mastery</h3>
        <button
          onClick={() => dispatch({ type: "start" })}
          className="btn btn-ui"
        >
          let's start
        </button>
      </div>
    </>
  );
};

export default StartScreen;
