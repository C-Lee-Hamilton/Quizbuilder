import { React, useState, useEffect } from "react";
import { usePageContext } from "../PageContext";
import CreateAccount from "./createAccount";
import axios from "axios";

function LoginPopup({
  logPop,
  setLogPop,
  setIsLoggedIn,
  isLoggedIn,
  fetchQuizzes,
}) {
  const [userLogin, setUserLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");
  const [create, setCreate] = useState(false);
  const [err, setErr] = useState("");
  const { setToken } = usePageContext("");
  const { setUsername } = usePageContext("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchQuizzes();
    }
  }, [fetchQuizzes, isLoggedIn]);

  if (!logPop) return null;

  const closer = () => {
    setLogPop(false);
    setUserLogin("");
    setPassLogin("");
    setErr("");
  };
  const creator = () => {
    setCreate(true);
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Auth/login", {
        username: userLogin,
        password: passLogin,
      });

      if (response.data.success) {
        setToken(response.data.token);
        setUsername(userLogin);
        setLogPop(false);
        setErr("");
        setIsLoggedIn(true);
      } else {
        setErr("Login Failed, Try Again");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 w-2/3 max-w-md mx-auto bg-green-500 border-4 border-white-500  text-white rounded-lg shadow-custom">
        <div className="flex flex-col items-center">
          {!create && (
            <>
              <span className="text-xl my-2 text-shadow-dark">Login</span>
              <input
                className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-grey-400 text-center rounded-lg my-2 shadow-custom"
                type="text"
                placeholder="username"
                onChange={(event) => setUserLogin(event.target.value)}
                value={userLogin}
              />
              <input
                className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-grey-400 text-center rounded-lg my-4 shadow-custom"
                type="password"
                placeholder="password"
                onChange={(event) => setPassLogin(event.target.value)}
                value={passLogin}
              />
              {err}
              <button
                onClick={handleLogin}
                className="px-4  w-full py-2 border-2 text-xl sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                Login
              </button>
              <button
                onClick={creator}
                className="px-4 w-full py-2 border-2 text-xl sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                Create Account
              </button>
              <button
                onClick={closer}
                className="px-4 w-full py-2 border-2 text-xl sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                Close
              </button>
            </>
          )}
          <CreateAccount create={create} setCreate={setCreate} />
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
