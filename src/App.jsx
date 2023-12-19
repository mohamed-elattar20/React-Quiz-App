import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import MainLayout from "./Components/MainLayout";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Timer from "./Components/Timer";
import { useQuiz } from "./Contexts/QuizContext";

function App() {
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
      <div className="app">
        <Header />
        <MainLayout>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <Progress />
              <Question />
              <Timer />
              {answer !== null && index < numOfQuestionsToTest - 1 ? (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                >
                  Next
                </button>
              ) : null}
              {answer !== null && index === numOfQuestionsToTest - 1 ? (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "FinishQuiz" })}
                >
                  Finish
                </button>
              ) : null}
            </>
          )}
          {status === "finished" && <FinishScreen />}
        </MainLayout>
      </div>
    </>
  );
}

export default App;
