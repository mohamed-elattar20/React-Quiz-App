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

const initialState = {
  questions: [],
  numOfQuestionsToTest: 5,
  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highScore: 0,
  secondsRemain: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (currState, action) => {
  const currQuestion = currState.questions.at(currState.index);
  switch (action.type) {
    case "dataRecieved":
      return {
        ...currState,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...currState, status: "error" };
    case "setNumOfQuestions":
      return {
        ...currState,
        numOfQuestionsToTest: action.payload,
      };
    case "start":
      return {
        ...currState,
        status: "active",
        secondsRemain:
          currState.questions.slice(0, currState.numOfQuestionsToTest).length *
          SECS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...currState,
        answer: action.payload,
        score:
          action.payload === currQuestion.correctOption
            ? currState.score + currQuestion.points
            : currState.score,
      };
    case "nextQuestion":
      return {
        ...currState,
        index: currState.index + 1,
        answer: null,
      };
    case "FinishQuiz":
      return {
        ...currState,
        status: "finished",
        highScore:
          currState.score > currState.highScore
            ? currState.score
            : currState.highScore,
      };
    case "restartQuiz":
      return {
        ...currState,
        status: "ready",
        index: 0,
        answer: null,
        score: 0,
        highScore: 0,
        secondsRemain: 10,
      };
    case "timer":
      return {
        ...currState,
        secondsRemain: currState.secondsRemain - 1,
        status: currState.secondsRemain === 0 ? "finished" : currState.status,
      };
    default:
      throw new Error("UnKnown Action");
  }
};

function App() {
  const [
    {
      questions,
      numOfQuestionsToTest,
      status,
      index,
      answer,
      score,
      highScore,
      secondsRemain,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const totalPointsOfQuiz = questions
    .slice(0, numOfQuestionsToTest)
    .reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const questions = await res.json();
        // console.log(questions);
        dispatch({ type: "dataRecieved", payload: questions });
      } catch (error) {
        // console.error(error.message);
        dispatch({ type: "dataFailed" });
      }
    };
    getQuestions();
  }, []);
  return (
    <>
      <div className="app">
        <Header />
        <MainLayout>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen
              numOfQuestionsToTest={numOfQuestionsToTest}
              dispatch={dispatch}
              numOfQuestions={numOfQuestions}
            />
          )}
          {status === "active" && (
            <>
              <Progress
                answer={answer}
                totalPointsOfQuiz={totalPointsOfQuiz}
                score={score}
                index={index}
                numOfQuestionsToTest={numOfQuestionsToTest}
              />
              <Question
                question={questions.slice(0, numOfQuestionsToTest).at(index)}
                dispatch={dispatch}
                answer={answer}
              />
              <Timer secondsRemain={secondsRemain} dispatch={dispatch} />
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
          {status === "finished" && (
            <FinishScreen
              dispatch={dispatch}
              highScore={highScore}
              score={score}
              totalPointsOfQuiz={totalPointsOfQuiz}
            />
          )}
        </MainLayout>
      </div>
    </>
  );
}

export default App;
