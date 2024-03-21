import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePageContext } from "../context/PageContext";
import { useParams } from "react-router-dom";
function TakeQuiz() {
  const { quizId } = useParams();

  const [started, setStarted] = useState(false);
  const [scoreScreen, setScoreScreen] = useState(false);
  const [tracker, setTracker] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState(" ");
  const [points, setPoints] = useState(0);
  const totalScore = (points / choices.length) * 100;
  const [Err, setErr] = useState("");

  const navigate = useNavigate();
  const { username, storedQuizzes } = usePageContext();

  const selectedQuiz = storedQuizzes.find((quiz) => quiz._id === quizId);

  const addViews = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Users/add-view",
        {
          newViews: selectedQuiz.views + 1,
          quizId: quizId,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const submitButton = () => {
    if (choice !== " ") {
      var t = selectedQuiz.quiz.length - 1;
      if (tracker === t) {
        if (selectedQuiz.author === username) {
          setChoices([...choices, choice]);
          setCorrectAnswers([
            ...correctAnswers,
            selectedQuiz.quiz[tracker].Answer,
          ]);
          setTracker(0);
          setScoreScreen(true);
        } else {
          setChoices([...choices, choice]);
          setCorrectAnswers([
            ...correctAnswers,
            selectedQuiz.quiz[tracker].Answer,
          ]);
          addViews();
          setTracker(0);
          setScoreScreen(true);
        }
      } else {
        setTracker(tracker + 1);
        setChoices([...choices, choice]);
        setCorrectAnswers([
          ...correctAnswers,
          selectedQuiz.quiz[tracker].Answer,
        ]);
      }
      if (selectedQuiz.quiz[tracker].Answer === choice) {
        setPoints(points + 1);
      } else setPoints(points);
      setChoice(" ");
      setErr("");
    } else setErr("Please Select An Answer");
  };
  if (selectedQuiz === undefined) {
    return null;
  }
  return (
    <div className="  overflow-hidden mx-auto  text-green-500 bg-green-500 border-4 border-white-500  text-white rounded-lg  shadow-custom w-11/12 flex-1 mt-2 mb-2">
      {Err}
      {!started && (
        <div>
          <h1 className="mx-auto w-3/4  text-center text-green-500 bg-green-500 text-3xl border-solid border-2 border-white-500 text-white rounded-lg my-2 shadow-custom">
            {selectedQuiz.title}
          </h1>
          <h2 className="  mx-auto text-lg text-white w-1/2">
            Created By: {selectedQuiz.author}
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
            {selectedQuiz.quiz[tracker].Question}
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
            {selectedQuiz.quiz[tracker].A}
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
            {selectedQuiz.quiz[tracker].B}
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
            {selectedQuiz.quiz[tracker].C}
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
            {selectedQuiz.quiz[tracker].D}
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
        onClick={() => navigate(-1)}
      >
        close
      </button>
    </div>
  );
}

export default TakeQuiz;
