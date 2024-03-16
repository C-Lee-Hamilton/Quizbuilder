import React, { useState, useEffect } from "react";
import { usePageContext } from "../PageContext";
import Popular from "../pages/Popular";
import MyQuiz from "../pages/MyQuiz";
import Search from "../pages/Search";
import axios from "axios";
import Login from "../components/LoginPopup";

function ModeSelect() {
  const [pop, setPop] = useState(false);
  const [myQ, setMyQ] = useState(true);
  const [searchPg, setSearchPg] = useState(false);
  const [dispTxt, setDispTxt] = useState("");
  const [logPop, setLogPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [popQuizzes, setPopQuizzes] = useState([]);
  // const [searchQuizzes, setSearchQuizzes] = useState([]);
  const { setToken, token, username } = usePageContext("");
  const [title, setTitle] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/Auth/logout");
      setToken("");
      setIsLoggedIn(false);
      setUserQuizzes([]);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const loginClick = () => {
    if (!isLoggedIn) {
      setLogPop(!logPop);
    } else handleLogout();
  };
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/my-quiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { username },
      });
      setUserQuizzes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  const fetchPopQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/pop-quiz");
      setPopQuizzes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  // const fetchTitleResults = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/auth/search-title",
  //       {
  //         params: { title },
  //       }
  //     );
  //     setSearchQuizzes(response.data);
  //     console.log(response.data);
  //     console.log(title);
  //   } catch (error) {
  //     console.error("Error fetching quizzes:", error);
  //   }
  // };
  const popClick = () => {
    setPop(true);
    setMyQ(false);
    setSearchPg(false);
    fetchPopQuizzes();
  };
  const myClick = () => {
    setPop(false);
    setMyQ(true);
    setSearchPg(false);
  };
  const searchClick = () => {
    setPop(false);
    setMyQ(false);
    setSearchPg(true);
    // fetchTitleResults();
  };

  return (
    <div className="border-solid relative mb-2 mt-2 flex flex-col items-center  overflow-hidden rounded-lg  border-0 flex-1 border-white-500 border-opacity-50 bg-green-500 bg-opacity-50  w-11/12 shadow-custom">
      {/* <div className=" flex w-full justify-end mb-0">
        <input
          type="text"
          placeholder="Search"
          className="w-1/4 h-1/4 text-center mb-0 "
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div> */}
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

        <button
          onClick={searchClick}
          className=" px-2  py-0 border-2 lg:text-3xl sm:text-sm 
            rounded-lg my-2 mx-2
           hover:bg-white hover:text-green-500 bg-green-500 text-white bg-opacity-50 active:scale-95 shadow-custom "
        >
          Search
        </button>
      </div>
      <div className="w-full flex justify-between">
        <button
          onClick={popClick}
          className={` ${
            pop
              ? "bg-white text-green-500 bg-opacity-100 "
              : "bg-green-500 text-white bg-opacity-50"
          }   px-4 py-1 w-1/3 mx-auto mr-5   border-2 lg:text-3xl sm:text-sm  rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
        >
          Popular
        </button>
        <button
          onClick={myClick}
          className={` ${
            myQ
              ? "bg-white text-green-500 bg-opacity-100 "
              : "bg-green-500 text-white bg-opacity-50"
          } px-4 py-1 w-1/3 mx-auto  ml-5 border-2 lg:text-3xl sm:text-sm    rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
        >
          My Quizzes
        </button>
      </div>
      <div className=" sm:text-2xl md:text-3xl border-solid flex flex-col mx-auto mb-5 flex-1 overflow-hidden rounded-lg  border-4  border-white-500 border-opacity-50 bg-green-500 bg-opacity-50 text-shadow-dark text-white w-11/12 ">
        <Popular pop={pop} popQuizzes={popQuizzes} />
        <MyQuiz
          myQ={myQ}
          isLoggedIn={isLoggedIn}
          userQuizzes={userQuizzes}
          fetchQuizzes={fetchQuizzes}
        />
        <Search
          searchPg={searchPg}
          // searchQuizzes={searchQuizzes}
        />
        <Login
          fetchQuizzes={fetchQuizzes}
          userQuizzes={userQuizzes}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          logPop={logPop}
          setLogPop={setLogPop}
        />
      </div>
    </div>
  );
}

export default ModeSelect;
