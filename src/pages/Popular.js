import { React, useState } from "react";
import TakeQuiz from "../components/TakeQuiz";
function Popular({ pop, popQuizzes }) {
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [takePop, setTakePop] = useState(false);
  const [viewAmt, setViewAmt] = useState();
  const takeQuizButton = (e) => {
    setSelectedQuiz([
      popQuizzes[e].title,
      popQuizzes[e].author,
      popQuizzes[e].quiz,
      popQuizzes[e]._id,
      popQuizzes[e].views,
    ]);
    setViewAmt(popQuizzes[e].views);
    setTakePop(!takePop);
  };
  if (!pop) return null;
  return (
    <div className=" flex-1 flex flex-col items-start">
      {!takePop && (
        <div className="w-full ">
          {popQuizzes.map((quiz, index) => (
            <div key={index} className="text-white">
              <button
                onClick={() => takeQuizButton(index)}
                className=" border-solid w-9/12 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                {quiz.title}
              </button>
            </div>
          ))}
        </div>
      )}
      <TakeQuiz
        selectedQuiz={selectedQuiz}
        take={takePop}
        setTake={setTakePop}
        Mode="Pop"
        viewAmt={viewAmt}
        setViewAmt={setViewAmt}
      />
    </div>
  );
}

export default Popular;
