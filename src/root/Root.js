import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "../components/header";

import Login from "../components/LoginPopup";

function ModeSelect() {
  const [logPop, setLogPop] = useState(false);

  return (
    <div className="border-solid relative mb-2 mt-2 flex flex-col items-center  overflow-hidden rounded-lg  border-0 flex-1 border-white-500 border-opacity-50 bg-green-500 bg-opacity-50  w-11/12 shadow-custom">
      <Header logPop={logPop} setLogPop={setLogPop} />
      <div className=" sm:text-2xl md:text-3xl border-solid flex flex-col mx-auto mb-5 flex-1 overflow-hidden rounded-lg  border-4  border-white-500 border-opacity-50 bg-green-500 bg-opacity-50 text-shadow-dark text-white w-11/12 ">
        <Outlet />
        <Login logPop={logPop} setLogPop={setLogPop} />
      </div>
    </div>
  );
}

export default ModeSelect;
