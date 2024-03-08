import { React, useState } from "react";
import Login from "../components/LoginPopup";
import NewQuiz from "../components/NewQuiz";
function MyQuiz({ myQ }) {
  const [logPop, setLogPop] = useState(false);
  const [newPop, setNewPop] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const loginClick = () => {
    setLogPop(!logPop);
  };
  const newClick = () => {
    setNewPop(!newPop);
  };
  const cons = () => {
    console.log(quizList);
  };
  if (!myQ) return null;
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className=" flex flex-col">
        <button
          onClick={cons}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          console test
        </button>
        <button
          onClick={loginClick}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          {/* {loggedIn ? "Logout" : "Login"} */}Login
        </button>
        <button
          onClick={newClick}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          Create New Quiz
        </button>
      </div>
      <Login logPop={logPop} setLogPop={setLogPop} />

      <NewQuiz
        newPop={newPop}
        setNewPop={setNewPop}
        quizList={quizList}
        setQuizList={setQuizList}
      />
    </div>
  );
}

export default MyQuiz;
