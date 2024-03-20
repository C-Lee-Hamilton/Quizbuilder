import React from "react";
import { usePageContext } from "../context/PageContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Header({ logPop, setLogPop }) {
  const { setToken, isLoggedIn, setIsLoggedIn, setStoredQuizzes, setUsername } =
    usePageContext("");
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/Auth/logout");
      setToken("");
      setIsLoggedIn(false);
      setStoredQuizzes([]);
      setUsername("");
      window.localStorage.setItem("MY_Token", "");
      window.localStorage.setItem("MY_Name", "");
      window.localStorage.setItem("MY_Logged_In", "false");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const loginClick = () => {
    if (!isLoggedIn) {
      setLogPop(!logPop);
    } else handleLogout();
  };

  return (
    <div>
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
        <Link
          to="/Search"
          className={` ${
            isActive("/Search")
              ? "bg-white text-green-500 bg-opacity-100 "
              : "bg-green-500 text-white bg-opacity-50"
          }   px-4 py-1     border-2 lg:text-3xl sm:text-sm  rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
        >
          Search
        </Link>
      </div>
      <div className="w-full flex justify-between">
        <Link
          to="/"
          className={` ${
            isActive("/")
              ? "bg-white text-green-500 bg-opacity-100 "
              : "bg-green-500 text-white bg-opacity-50"
          }   px-4 py-1     border-2 lg:text-3xl sm:text-sm  rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
        >
          Popular
        </Link>
        <Link
          to="/myquiz"
          className={` ${
            isActive("/myquiz")
              ? "bg-white text-green-500 bg-opacity-100 "
              : "bg-green-500 text-white bg-opacity-50"
          } px-4 py-1  mr-2   border-2 lg:text-3xl sm:text-sm    rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
        >
          My Quizzes
        </Link>
      </div>
    </div>
  );
}

export default Header;
