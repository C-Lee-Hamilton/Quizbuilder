import React, { useState, useEffect } from "react";
import Popular from "../pages/Popular";
import MyQuiz from "../pages/MyQuiz";
import Search from "../pages/Search";

function ModeSelect() {
  const [pop, setPop] = useState(false);
  const [myQ, setMyQ] = useState(true);
  const [searchPg, setSearchPg] = useState(false);
  const [dispTxt, setDispTxt] = useState("");

  useEffect(() => {
    const textCheck = () => {
      if (pop) {
        setDispTxt("Popular");
      } else if (myQ) {
        setDispTxt("My Quizzes");
      } else if (searchPg) {
        setDispTxt("Search");
      }
    };
    textCheck();
  }, [pop, myQ, searchPg, dispTxt]);

  const popClick = () => {
    setPop(true);
    setMyQ(false);
    setSearchPg(false);
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
  };

  return (
    <div className="border-solid relative mb-2 flex flex-col items-center  overflow-hidden rounded-lg  border-4 flex-1 border-white-500 border-opacity-50 bg-green-500 bg-opacity-50  w-11/12 shadow-custom">
      <div>
        <button
          onClick={popClick}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          Popular
        </button>
        <button
          onClick={myClick}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1  bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          My Quizzes
        </button>
        <button
          onClick={searchClick}
          className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
        >
          Search
        </button>
      </div>
      <div className=" sm:text-2xl md:text-3xl border-solid flex flex-col mx-auto mb-5 flex-1 overflow-hidden rounded-lg  border-4  border-white-500 border-opacity-50 bg-green-500 bg-opacity-50 text-shadow-dark text-white w-11/12 ">
        {dispTxt}
        <Popular pop={pop} />
        <MyQuiz myQ={myQ} />
        <Search searchPg={searchPg} />
      </div>
    </div>
  );
}

export default ModeSelect;
