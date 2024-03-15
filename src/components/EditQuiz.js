import { React, useState } from "react";
import axios from "axios";
function EditQuiz({ editor, setEditor, selectedQuiz }) {
  const [selectedQ, setSelectedQ] = useState([]);
  const [qInput, setQInput] = useState("");
  const [a1Input, setA1Input] = useState("");
  const [a2Input, setA2Input] = useState("");
  const [a3Input, setA3Input] = useState("");
  const [a4Input, setA4Input] = useState("");
  const [title, setTitle] = useState();
  const [answer, setAnswer] = useState("");
  const [tracker, setTracker] = useState(0);
  const [qPop, setQPop] = useState(false);
  const [qIndex, setQIndex] = useState();
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const closeButton = () => {
    setTracker(0);
    setEditor(false);
    setIsTitleEdit(false);
  };
  const tester = () => {
    // console.log(selectedQuiz[0]);
    // setSelectedQ(selectedQuiz[2]);
    console.log(qIndex);
  };
  const editQuestion = (e) => {
    setQPop(true);
    setSelectedQ(selectedQuiz[2][e]);
    setAnswer(selectedQuiz[2][e].Answer);
    setTitle(selectedQuiz[0]);
    setA1Input(selectedQuiz[2][e].A);
    setA2Input(selectedQuiz[2][e].B);
    setA3Input(selectedQuiz[2][e].C);
    setA4Input(selectedQuiz[2][e].D);
    setQIndex(e);
  };
  const closeQuestion = () => {
    setQPop(false);
  };

  const saveTitle = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Users/edit-quiz-title",
        {
          newTitle: title,
          quizId: selectedQuiz[3],
        }
      );
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  const saveQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Auth/edit-question",
        {
          quizId: selectedQuiz[3],
          newData: {
            Question: qInput,
            A: a1Input,
            B: a2Input,
            C: a3Input,
            D: a4Input,
            Answer: answer,
          },
          questionIndex: qIndex,
        }
      );
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const editTitle = () => {
    if (!isTitleEdit) {
      setIsTitleEdit(true);
    } else {
      saveTitle();
      setIsTitleEdit(false);
    }
  };
  if (!editor) return null;
  return (
    <div className="  overflow-hidden  text-green-500 bg-green-500 border-4 border-white-500  text-white rounded-lg shadow-custom w-11/12 flex-1 mt-2 mb-2">
      {!qPop && (
        <>
          {!isTitleEdit && (
            <>
              <input
                type="text"
                placeholder={selectedQuiz[0]}
                value={title}
                className=" hover:cursor-default placeholder-white text-center  border-solid  w-9/12 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 shadow-custom"
              />
            </>
          )}
          {isTitleEdit && (
            <>
              <input
                className="text-center text-green-500 w-9/12 mx-2 border-2 rounded-lg mt-2"
                type="text"
                placeholder={selectedQuiz[0]}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </>
          )}
          <button
            onClick={editTitle}
            className=" border-solid px-1  rounded-lg my-2 text-lg text-green-500 bg-white border-2 border-white-100 hover:bg-green-500 hover:text-white active:scale-95 shadow-custom"
          >
            {isTitleEdit ? "Save" : "Edit"}
          </button>
          {selectedQuiz[2].map((quest, index) => (
            <div key={index} className="text-white">
              <button className="hover:cursor-default border-solid w-9/12 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 shadow-custom">
                {quest.Question}
              </button>
              <button
                onClick={() => editQuestion(index)}
                className=" border-solid px-1 rounded-lg my-2 text-lg text-green-500 bg-white border-2 border-white-100 hover:bg-green-500 hover:text-white active:scale-95 shadow-custom"
              >
                edit
              </button>
            </div>
          ))}
          <button
            onClick={tester}
            className=" border-2 w-2/3 text-xl bg-green-500 bg-opacity-50 text-white rounded-lg mt-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Delete Quiz
          </button>
          <br />
          <button
            onClick={closeButton}
            className=" border-2 w-2/3 text-xl bg-green-500 bg-opacity-50 text-white rounded-lg mt-2 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Close
          </button>
        </>
      )}

      {qPop && (
        <>
          <input
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            type="text"
            placeholder={selectedQ.Question}
            className="mx-auto w-11/12 text-center text-green-500  my-2"
          />
          <input
            value={a1Input}
            onChange={(e) => setA1Input(e.target.value)}
            type="text"
            placeholder={selectedQ.A}
            className="mx-auto w-3/4 my-1 text-green-500 text-center"
          />
          <input
            value={a2Input}
            onChange={(e) => setA2Input(e.target.value)}
            placeholder={selectedQ.B}
            type="text"
            className="mx-auto w-3/4 my-1 text-green-500 text-center"
          />
          <input
            value={a3Input}
            onChange={(e) => setA3Input(e.target.value)}
            placeholder={selectedQ.C}
            type="text"
            className="mx-auto w-3/4 my-1 text-green-500 text-center"
          />
          <input
            value={a4Input}
            onChange={(e) => setA4Input(e.target.value)}
            placeholder={selectedQ.D}
            type="text"
            className="mx-auto w-3/4 my-1 text-green-500 text-center"
          />

          <div className="w-3/4 mx-auto">
            <button
              className={` ${
                answer === "A"
                  ? "bg-white text-green-500 bg-opacity-100 border-green-500"
                  : "bg-green-500 text-white "
              } border-2 mx-1 w-1/5 text-2xl rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
              id="A"
              onClick={(e) => setAnswer(e.target.id)}
            >
              A
            </button>
            <button
              className={` ${
                answer === "B"
                  ? "bg-white text-green-500 bg-opacity-100 border-green-500"
                  : "bg-green-500 text-white "
              } border-2 mx-1 w-1/5 text-2xl rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
              id="B"
              onClick={(e) => setAnswer(e.target.id)}
            >
              B
            </button>
            <button
              className={` ${
                answer === "C"
                  ? "bg-white text-green-500 bg-opacity-100 border-green-500"
                  : "bg-green-500 text-white "
              } border-2 mx-1 w-1/5 text-2xl rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
              id="C"
              onClick={(e) => setAnswer(e.target.id)}
            >
              C
            </button>
            <button
              className={` ${
                answer === "D"
                  ? "bg-white text-green-500 bg-opacity-100 border-green-500"
                  : "bg-green-500 text-white "
              } border-2 mx-1 w-1/5 text-2xl rounded-lg my-2  hover:bg-white hover:text-green-500 active:scale-95 shadow-custom`}
              id="D"
              onClick={(e) => setAnswer(e.target.id)}
            >
              D
            </button>
          </div>

          <div className="relative flex flex-col justify-center items-center">
            <button
              onClick={saveQuestion}
              className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
            >
              Save
            </button>
          </div>
          <button
            onClick={tester}
            className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Delete Question
          </button>
          <button
            onClick={closeQuestion}
            className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Close
          </button>
          <button onClick={tester}>tester</button>
        </>
      )}
    </div>
  );
}

export default EditQuiz;
