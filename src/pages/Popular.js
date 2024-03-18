import { React } from "react";
import TakeQuiz from "../components/TakeQuiz";
import { usePageContext } from "../PageContext";
function Popular({}) {
  const { storedQuizzes, formatQuizData, setViewAmt, take, setTake } =
    usePageContext("");

  const takeQuizButton = (e) => {
    formatQuizData(e);
    setViewAmt(storedQuizzes[e].views);
    setTake(!take);
  };

  return (
    <div className=" flex-1 flex flex-col items-start">
      {!take && (
        <div className="w-full ">
          {storedQuizzes.map((quiz, index) => (
            <div key={index} className="text-white">
              <button
                onClick={() => takeQuizButton(index)}
                className=" border-solid w-9/12 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                {quiz.title}
                Times Taken:{quiz.views}
              </button>
            </div>
          ))}
        </div>
      )}
      <TakeQuiz Mode="Pop" />
    </div>
  );
}

export default Popular;
