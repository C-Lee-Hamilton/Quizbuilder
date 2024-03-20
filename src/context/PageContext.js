import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [storedQuizzes, setStoredQuizzes] = useState([]);

  useEffect(() => {
    const tokenData = window.localStorage.getItem("MY_Token");
    const nameData = window.localStorage.getItem("MY_Name");

    if (tokenData !== null) setToken(JSON.parse(tokenData));
    if (nameData !== null) setUsername(JSON.parse(nameData));
    console.log("Token data:", tokenData);
    console.log("Name data:", nameData);
    console.log(username);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MY_Token", JSON.stringify(token));
    window.localStorage.setItem("MY_Name", JSON.stringify(username));
  }, [token, username]);

  useEffect(() => {
    username !== "" ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [username]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/my-quiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { username },
      });
      setStoredQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const fetchPopQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/pop-quiz");
      setStoredQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  return (
    <PageContext.Provider
      value={{
        token,
        setToken,
        username,
        setUsername,
        fetchPopQuizzes,
        isLoggedIn,
        setIsLoggedIn,
        fetchQuizzes,
        storedQuizzes,
        setStoredQuizzes,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
