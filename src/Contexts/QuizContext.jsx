import { createContext, useContext, useEffect, useReducer } from "react";

export const QuizContext = createContext();

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
export const QuizProvider = ({ children }) => {
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

  const numOfQuestions = questions.length;
  const totalPointsOfQuiz = questions
    .slice(0, numOfQuestionsToTest)
    .reduce((prev, curr) => prev + curr.points, 0);
  return (
    <>
      <QuizContext.Provider
        value={{
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
        }}
      >
        {children}
      </QuizContext.Provider>
      ;
    </>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Errrrrrrr");
  return context;
};
