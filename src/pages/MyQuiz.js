import { React, useState } from "react";
import { usePageContext } from "../PageContext";
import axios from "axios";
import Login from "../components/LoginPopup";
import NewQuiz from "../components/NewQuiz";
function MyQuiz({ myQ }) {
  const [logPop, setLogPop] = useState(false);
  const [newPop, setNewPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const [test, setTest] = useState([]);
  const { setToken } = usePageContext("");
  const { username } = usePageContext("");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/Auth/logout");
      setToken("");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const loginClick = () => {
    if (!isLoggedIn) {
      setLogPop(!logPop);
    } else handleLogout();
  };

  const newClick = () => {
    setNewPop(!newPop);
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/my-quiz", {
        username: username,
      });
      setTest(response.data.myQuizzes);
      console.log(response.myQuizzes);
    } catch (error) {
      console.error("Error fetching hours:", error);
    }
  };

  if (!myQ) return null;
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className=" flex flex-col">
        <button
          onClick={fetchQuizzes}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          TesterButton
        </button>
        <button
          onClick={loginClick}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
        {isLoggedIn && (
          <>
            {" "}
            <button
              onClick={newClick}
              className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
            >
              Create New Quiz
            </button>
          </>
        )}
      </div>
      <Login
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        logPop={logPop}
        setLogPop={setLogPop}
      />

      {!isLoggedIn && (
        <div className="sm:text-2xl md:text-3xl mx-auto text-shadow-dark text-white w-11/12 ">
          Login to create quizzes
        </div>
      )}

      {test}

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
