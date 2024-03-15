import { React, useState } from "react";
import { usePageContext } from "../PageContext";

import NewQuiz from "../components/NewQuiz";
import TakeQuiz from "../components/TakeQuiz";
import EditQuiz from "../components/EditQuiz";
function MyQuiz({ myQ, isLoggedIn, userQuizzes, fetchQuizzes }) {
  const [newPop, setNewPop] = useState(false);

  const [take, setTake] = useState(false);
  const [editor, setEditor] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState([]);

  const newClick = () => {
    setNewPop(!newPop);
  };

  const takeQuizButton = (e) => {
    setSelectedQuiz([
      userQuizzes[e].title,
      userQuizzes[e].author,
      userQuizzes[e].quiz,
      userQuizzes[e]._id,
    ]);

    setTake(!take);
    console.log(take);
  };

  const editButton = (e) => {
    setSelectedQuiz([
      userQuizzes[e].title,
      userQuizzes[e].author,
      userQuizzes[e].quiz,
      userQuizzes[e]._id,
    ]);

    setEditor(true);
  };

  if (!myQ) return null;
  return (
    <div className="flex-1 flex flex-col items-center ">
      {!newPop && !take && !editor && (
        <div className=" flex flex-col">
          {isLoggedIn && (
            <>
              {" "}
              <button
                onClick={newClick}
                className="px-4 py-2 border-2 lg:text-3xl sm:text-sm sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                Create New Quiz
              </button>
            </>
          )}
        </div>
      )}

      {!isLoggedIn && (
        <div className="sm:text-2xl md:text-3xl mx-auto text-shadow-dark text-white w-11/12 ">
          Login to create quizzes
        </div>
      )}
      <TakeQuiz take={take} setTake={setTake} selectedQuiz={selectedQuiz} />
      {!newPop && !take && !editor && (
        <div className="w-full ">
          {userQuizzes.map((quiz, index) => (
            <div key={index} className="text-white">
              <button
                onClick={() => takeQuizButton(index)}
                className=" border-solid w-9/12 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                {quiz.title}
              </button>
              <button
                onClick={() => editButton(index)}
                className=" border-solid px-1 rounded-lg my-2 text-lg text-green-500 bg-white border-2 border-white-100 hover:bg-green-500 hover:text-white active:scale-95 shadow-custom"
              >
                edit
              </button>
            </div>
          ))}
        </div>
      )}
      <EditQuiz
        editor={editor}
        setEditor={setEditor}
        selectedQuiz={selectedQuiz}
      />
      <NewQuiz
        newPop={newPop}
        setNewPop={setNewPop}
        fetchQuizzes={fetchQuizzes}
      />
    </div>
  );
}

export default MyQuiz;
