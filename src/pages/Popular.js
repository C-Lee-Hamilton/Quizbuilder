import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageContext } from "../context/PageContext";
function Popular() {
  const {
    storedQuizzes,

    fetchPopQuizzes,
  } = usePageContext("");
  useEffect(() => {
    let ignore = false;

    if (!ignore) fetchPopQuizzes();
    return () => {
      ignore = true;
    };
  }, [fetchPopQuizzes]);

  return (
    <div className=" flex-1 flex flex-col items-start">
      <div className="w-full ">
        {storedQuizzes.map((quiz, index) => (
          <div key={index} className="text-white">
            <Link
              to={`/takequiz/${quiz._id}`}
              className=" border-solid w-9/12 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
            >
              {quiz.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
