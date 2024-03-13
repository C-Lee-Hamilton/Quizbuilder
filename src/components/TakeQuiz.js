import { React, useState } from "react";

function TakeQuiz({ take, setTake, selectedQuiz }) {
  const [started, setStarted] = useState(false);
  const [scoreScreen, setScoreScreen] = useState(false);
  const [tracker, setTracker] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState(" ");
  const [points, setPoints] = useState(0);
  const totalScore = (points / choices.length) * 100;

  const close = () => {
    setStarted(false);
    setTake(false);
    setScoreScreen(false);
    setPoints(0);
    setChoices([]);
    setCorrectAnswers([]);
  };

  const submitButton = () => {
    var t = selectedQuiz[2].length - 1;
    if (tracker === t) {
      setChoices([...choices, choice]);
      setCorrectAnswers([...correctAnswers, selectedQuiz[2][tracker].Answer]);
      setTracker(0);
      setScoreScreen(true);
    } else {
      setTracker(tracker + 1);
      setChoices([...choices, choice]);
      setCorrectAnswers([...correctAnswers, selectedQuiz[2][tracker].Answer]);
    }
    if (selectedQuiz[2][tracker].Answer === choice) {
      setPoints(points + 1);
    } else setPoints(points);
    setChoice(" ");
  };

  if (!take) return null;
  return (
    <div className="  overflow-hidden  text-green-500 bg-green-500 border-4 border-white-500  text-white rounded-lg  shadow-custom w-11/12 flex-1  mb-2">
      {!started && (
        <div>
          <h1 className="mx-auto w-3/4 text-center text-green-500 bg-green-500 text-lg border-solid border-2 border-white-500 text-white rounded-lg my-2 shadow-custom">
            {selectedQuiz[0]}
          </h1>
          <h2 className="  mx-auto text-lg text-white w-1/2">
            Created By: {selectedQuiz[1]}
          </h2>
          <button
            onClick={() => setStarted(true)}
            className=" border-2 mt-20 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Start Quiz
          </button>
        </div>
      )}
      {started && !scoreScreen && (
        <div>
          <h1 className=" mx-auto w-11/12 text-center text-green-500  my-2 bg-white border-2 border-solid border-green-500 rounded-lg shadow-custom text-shadow-default ">
            {selectedQuiz[2][tracker].Question}
          </h1>
          <button
            style={{
              backgroundColor: choice === "A" ? "white" : "#22C55E",
              color: choice === "A" ? "#22C55E" : "white",
            }}
            onClick={() => setChoice("A")}
            id="A"
            className="mx-auto w-3/4 my-1 mt-10  text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            {selectedQuiz[2][tracker].A}
          </button>
          <button
            style={{
              backgroundColor: choice === "B" ? "white" : "#22C55E",
              color: choice === "B" ? "#22C55E" : "white",
            }}
            onClick={() => setChoice("B")}
            id="B"
            className="mx-auto w-3/4 my-1 text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            {selectedQuiz[2][tracker].B}
          </button>
          <button
            style={{
              backgroundColor: choice === "C" ? "white" : "#22C55E",
              color: choice === "C" ? "#22C55E" : "white",
            }}
            onClick={() => setChoice("C")}
            id="C"
            className="mx-auto w-3/4 my-1  text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            {selectedQuiz[2][tracker].C}
          </button>
          <button
            style={{
              backgroundColor: choice === "D" ? "white" : "#22C55E",
              color: choice === "D" ? "#22C55E" : "white",
            }}
            onClick={() => setChoice("D")}
            id="D"
            className="mx-auto w-3/4 my-1  text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            {selectedQuiz[2][tracker].D}
          </button>
          <button
            onClick={submitButton}
            className="mx-auto w-3/4 my-1 mt-20  text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            submit
          </button>
        </div>
      )}
      {started && scoreScreen && (
        <>
          <div>You Scored {totalScore}% !</div>
        </>
      )}

      <br />
      <button
        className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        onClick={close}
      >
        close
      </button>
    </div>
  );
}

export default TakeQuiz;
