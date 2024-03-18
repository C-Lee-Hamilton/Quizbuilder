import React, { useState } from "react";
import { usePageContext } from "../PageContext";
import { Link, Outlet } from "react-router-dom";

import axios from "axios";
import Login from "../components/LoginPopup";

function ModeSelect() {
  const [pop, setPop] = useState(false);
  const [myQ, setMyQ] = useState(true);
  const [searchPg, setSearchPg] = useState(false);
  const [logPop, setLogPop] = useState(false);

  const {
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    storedQuizzes,
    setStoredQuizzes,
    fetchQuizzes,
  } = usePageContext("");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/Auth/logout");
      setToken("");
      setIsLoggedIn(false);
      setStoredQuizzes([]);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const loginClick = () => {
    if (!isLoggedIn) {
      setLogPop(!logPop);
    } else handleLogout();
  };

  const fetchPopQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/pop-quiz");
      setStoredQuizzes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const modeClick = (e) => {
    if (e === "popular") {
      setPop(true);
      setMyQ(false);
      setSearchPg(false);
      fetchPopQuizzes();
    } else if (e === "myquiz") {
      setPop(false);
      setMyQ(true);
      setSearchPg(false);
    } else {
      setPop(false);
      setMyQ(false);
      setSearchPg(true);
    }
  };

  return (
    <div className="border-solid relative mb-2 mt-2 flex flex-col items-center  overflow-hidden rounded-lg  border-0 flex-1 border-white-500 border-opacity-50 bg-green-500 bg-opacity-50  w-11/12 shadow-custom">
      <div className="w-full flex justify-between">
        <button
          onClick={loginClick}
          className="px-2 py-0 border-2 justify-between lg:text-3xl sm:text-sm mx-2 bg-green-500 bg-opacity-50 text-white rounded-lg my-2  lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        <h1 className=" lg:text-5xl md:text-4xl sm:text-3xl text-white text-shadow-dark mb-0 mt-0">
          QuizBuilder
        </h1>
        <Link to="/Search">
          {" "}
          <button
            onClick={() => modeClick("search")}
            className=" px-2  py-0 border-2 lg:text-3xl sm:text-sm 
            rounded-lg my-2 mx-2
           hover:bg-white hover:text-green-500 bg-green-500 text-white bg-opacity-50 active:scale-95 shadow-custom "
          >
            Search
          </button>{" "}
        </Link>
      </div>
      <div className="w-full flex justify-between">
        <Link to="/Popular">
          {" "}
          <button
            onClick={() => modeClick("popular")}
            className={` ${
              pop
                ? "bg-white text-green-500 bg-opacity-100 "
                : "bg-green-500 text-white bg-opacity-50"
            }   px-4 py-1 w-1/3 mx-auto mr-5   border-2 lg:text-3xl sm:text-sm  rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
          >
            Popular
          </button>
        </Link>
        <Link to="/MyQuiz">
          <button
            onClick={() => modeClick("myquiz")}
            className={` ${
              myQ
                ? "bg-white text-green-500 bg-opacity-100 "
                : "bg-green-500 text-white bg-opacity-50"
            } px-4 py-1 w-1/3 mx-auto  ml-5 border-2 lg:text-3xl sm:text-sm    rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
          >
            My Quizzes
          </button>
        </Link>
      </div>
      <div className=" sm:text-2xl md:text-3xl border-solid flex flex-col mx-auto mb-5 flex-1 overflow-hidden rounded-lg  border-4  border-white-500 border-opacity-50 bg-green-500 bg-opacity-50 text-shadow-dark text-white w-11/12 ">
        <Outlet />
        <Login logPop={logPop} setLogPop={setLogPop} />
      </div>
    </div>
  );
}

export default ModeSelect;
