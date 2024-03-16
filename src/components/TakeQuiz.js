import { React, useState } from "react";
import axios from "axios";
function TakeQuiz({ take, setTake, selectedQuiz, Mode, viewAmt, setViewAmt }) {
  const [started, setStarted] = useState(false);
  const [scoreScreen, setScoreScreen] = useState(false);
  const [tracker, setTracker] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState(" ");
  const [points, setPoints] = useState(0);
  const totalScore = (points / choices.length) * 100;
  const [Err, setErr] = useState("");
  const [newView, setNewView] = useState(0);
  const tester = () => {
    console.log(viewAmt + 1);
    setNewView(viewAmt + 1);
    console.log(newView);
  };

  const addViews = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Users/add-view",
        {
          newViews: viewAmt + 1,
          quizId: selectedQuiz[3],
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  const close = () => {
    setStarted(false);

    setTake(false);

    setScoreScreen(false);
    setPoints(0);
    setChoices([]);
    setCorrectAnswers([]);
    setChoice(" ");
    setErr("");
  };

  const submitButton = () => {
    if (choice !== " ") {
      var t = selectedQuiz[2].length - 1;
      if (tracker === t) {
        if (Mode === "Mine") {
          setChoices([...choices, choice]);
          setCorrectAnswers([
            ...correctAnswers,
            selectedQuiz[2][tracker].Answer,
          ]);
          setTracker(0);
          setScoreScreen(true);
        } else if (Mode === "Pop") {
          setChoices([...choices, choice]);
          setCorrectAnswers([
            ...correctAnswers,
            selectedQuiz[2][tracker].Answer,
          ]);
          addViews();
          setTracker(0);
          setScoreScreen(true);
        } else if (Mode === "Search") {
          setChoices([...choices, choice]);
          setCorrectAnswers([
            ...correctAnswers,
            selectedQuiz[2][tracker].Answer,
          ]);
          addViews();
          setTracker(0);
          setScoreScreen(true);
        }
      } else {
        setTracker(tracker + 1);
        setChoices([...choices, choice]);
        setCorrectAnswers([...correctAnswers, selectedQuiz[2][tracker].Answer]);
      }
      if (selectedQuiz[2][tracker].Answer === choice) {
        setPoints(points + 1);
      } else setPoints(points);
      setChoice(" ");
      setErr("");
    } else setErr("Please Select An Answer");
  };

  if (!take) return null;
  return (
    <div className="  overflow-hidden  text-green-500 bg-green-500 border-4 border-white-500  text-white rounded-lg  shadow-custom w-11/12 flex-1 mt-2 mb-2">
      {Err}
      {!started && (
        <div>
          <button onClick={tester}>tester</button>
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
            onClick={() => setChoice("A")}
            id="A"
            className={` ${
              choice === "A"
                ? "bg-white text-green-500"
                : "bg-green-500 text-white"
            } mx-auto w-3/4 my-1 text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
          >
            {selectedQuiz[2][tracker].A}
          </button>
          <button
            onClick={() => setChoice("B")}
            id="B"
            className={` ${
              choice === "B"
                ? "bg-white text-green-500"
                : "bg-green-500 text-white"
            } mx-auto w-3/4 my-1 text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
          >
            {selectedQuiz[2][tracker].B}
          </button>
          <button
            onClick={() => setChoice("C")}
            id="C"
            className={` ${
              choice === "C"
                ? "bg-white text-green-500"
                : "bg-green-500 text-white"
            } mx-auto w-3/4 my-1 text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
          >
            {selectedQuiz[2][tracker].C}
          </button>
          <button
            onClick={() => setChoice("D")}
            id="D"
            className={` ${
              choice === "D"
                ? "bg-white text-green-500"
                : "bg-green-500 text-white"
            } mx-auto w-3/4 my-1 text-center border-2 rounded-lg hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
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
          <h1 className="mt-20">Total Score</h1>
          <h2 className="mt-10 text-5xl">{totalScore}%!</h2>
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
