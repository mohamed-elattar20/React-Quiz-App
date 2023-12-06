import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemain }) => {
  const mins = Math.floor(secondsRemain / 60);
  const seconds = secondsRemain % 60;
  useEffect(() => {
    const timerId = setInterval(() => {
      //
      dispatch({ type: "timer" });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);
  return (
    <>
      <div className="timer">
        {mins < 10 && "0"}
        {mins}:{seconds < 10 && "0"}
        {seconds}
      </div>
    </>
  );
};

export default Timer;
