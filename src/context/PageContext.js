import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [username, setUsername] = useState("");

  const [storedQuizzes, setStoredQuizzes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [viewAmt, setViewAmt] = useState();
  const [take, setTake] = useState(false);
  const [title, setTitle] = useState("");
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/my-quiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { username },
      });
      setStoredQuizzes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
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

  // const formatQuizData = (e) => {
  //   setSelectedQuiz([
  //     storedQuizzes[e].title,
  //     storedQuizzes[e].author,
  //     storedQuizzes[e].quiz,
  //     storedQuizzes[e]._id,
  //     storedQuizzes[e].views,
  //   ]);
  //   setTitle(storedQuizzes[e].title);
  // };

  // const fetchQuiz = (id) => {
  //   return [
  //     storedQuizzes[id]
  //   ];
  // };

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
        // formatQuizData,
        viewAmt,
        setViewAmt,
        take,
        setTake,
        selectedQuiz,
        setSelectedQuiz,
        title,
        setTitle,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
