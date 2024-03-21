import { React, useEffect } from "react";
import { usePageContext } from "../context/PageContext";
import { Link } from "react-router-dom";

function MyQuiz() {
  const { isLoggedIn, storedQuizzes, fetchQuizzes } = usePageContext("");

  useEffect(() => {
    let ignore = false;

    if (!ignore) fetchQuizzes();
    return () => {
      ignore = true;
    };
  }, [fetchQuizzes]);

  return (
    <div className="flex-1 flex flex-col w-full  items-center ">
      <div className=" flex flex-col ">
        {isLoggedIn && (
          <>
            {" "}
            <Link
              to="/newQuiz"
              className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
            >
              Create New Quiz
            </Link>
          </>
        )}
      </div>

      {!isLoggedIn && (
        <div className="sm:text-2xl md:text-3xl mx-auto text-shadow-dark text-white w-11/12 ">
          Login to create quizzes
        </div>
      )}

      <div className="w-full flex justify-between items-center flex-col mx-auto">
        {storedQuizzes.map((quiz, index) => (
          <div
            key={index}
            className="text-white flex justify-between mx-auto w-3/4 mt-4"
          >
            <Link
              className=" border-solid w-3/4 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              to={`/takequiz/${quiz._id}`}
            >
              {quiz.title}
            </Link>

            <Link
              to={`/edit/${quiz._id}`}
              className=" border-solid px-1 w-1/4 flex-1 rounded-lg my-2 text-lg text-green-500 bg-white border-2 border-white-100 hover:bg-green-500 hover:text-white active:scale-95 shadow-custom"
            >
              edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyQuiz;
