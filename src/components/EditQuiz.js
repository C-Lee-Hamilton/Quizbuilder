import { React, useState } from "react";
import axios from "axios";
import { usePageContext } from "../context/PageContext";
import { useParams, useNavigate } from "react-router-dom";

function EditQuiz() {
  const [selectedQ, setSelectedQ] = useState([]);
  const [qInput, setQInput] = useState("");
  const [a1Input, setA1Input] = useState("");
  const [a2Input, setA2Input] = useState("");
  const [a3Input, setA3Input] = useState("");
  const [a4Input, setA4Input] = useState("");
  const [answer, setAnswer] = useState("");
  const [addQ, setAddQ] = useState(false);
  const [qPop, setQPop] = useState(false);
  const [qIndex, setQIndex] = useState();
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [title, setTitle] = useState("");
  const { storedQuizzes } = usePageContext("");
  const navigate = useNavigate();

  const { quizId } = useParams();

  const selectedQuiz = storedQuizzes.find((quiz) => quiz._id === quizId);

  const tester = () => {
    console.log(selectedQuiz);
  };

  const addQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Users/add-question",
        {
          Question: qInput,
          A: a1Input,
          B: a2Input,
          C: a3Input,
          D: a4Input,
          Answer: answer,
          quizIndex: quizId,
        }
      );
      setAddQ(false);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  const viewAddQ = () => {
    setAddQ(!addQ);
  };
  // const closeButton = () => {
  //   setIsTitleEdit(false);

  //   fetchQuizzes();
  // };

  const editQuestion = (e) => {
    setQPop(true);
    setSelectedQ(selectedQuiz.quiz[e]);
    setAnswer(selectedQuiz.quiz[e].Answer);
    // setTitle(selectedQuiz.title);
    setA1Input(selectedQuiz.quiz[e].A);
    setA2Input(selectedQuiz.quiz[e].B);
    setA3Input(selectedQuiz.quiz[e].C);
    setA4Input(selectedQuiz.quiz[e].D);
    setQInput(selectedQuiz.quiz[e].title);

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
          quizId: quizId,
        }
      );
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  const deleteQuestion = async () => {
    try {
      await axios.delete("http://localhost:5000/Users/delete-question", {
        data: {
          quizId: quizId,
          questionIndex: qIndex,
        },
      });
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };
  const deleteQuiz = async () => {
    try {
      axios.delete("http://localhost:5000/Users/delete-quiz", {
        data: {
          quizId: quizId,
        },
      });
      console.log("success");
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };
  const saveQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Auth/edit-question",
        {
          quizId: quizId,
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
      setQPop(false);
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
  if (selectedQuiz === undefined) {
    return null;
  }
  return (
    <div className="  overflow-hidden  text-green-500 bg-green-500 border-4 border-white-500  text-white rounded-lg shadow-custom w-11/12 flex-1 mt-2 mb-2">
      {!qPop && !addQ && (
        <>
          <button onClick={tester}>tester</button>
          Quiz Name
          {!isTitleEdit && (
            <>
              <input
                type="text"
                placeholder={title === "" ? selectedQuiz.title : title}
                // value={selectedQuiz.title}
                className=" hover:cursor-default placeholder-white text-center  border-solid  w-9/12 rounded-lg my-2 mx-2 bg-green-500 border-2 border-white-100 shadow-custom"
              />
            </>
          )}
          {isTitleEdit && (
            <>
              <input
                className="text-center text-green-500 w-9/12 mx-2 border-2 rounded-lg mt-2"
                type="text"
                placeholder={selectedQuiz.title}
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
          Questions
          {selectedQuiz.quiz.map((quest, index) => (
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
            onClick={viewAddQ}
            className=" border-2 w-2/3 text-xl bg-green-500 bg-opacity-50 text-white rounded-lg mt-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Add Question
          </button>
          <button
            onClick={deleteQuiz}
            className=" border-2 w-2/3 text-xl bg-green-500 bg-opacity-50 text-white rounded-lg mt-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Delete Quiz
          </button>
          <br />
          <button
            onClick={() => navigate(-1)}
            className=" border-2 w-2/3 text-xl bg-green-500 bg-opacity-50 text-white rounded-lg mt-2 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
          >
            Close
          </button>
        </>
      )}

      {(qPop || addQ) && (
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

          <>
            <div className="relative flex flex-col justify-center items-center">
              <button
                onClick={qPop ? saveQuestion : addQuestion}
                className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
              >
                {qPop ? "Save" : "Add Question"}
              </button>
            </div>
            {qPop && (
              <>
                <button
                  onClick={deleteQuestion}
                  className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
                >
                  Delete Question
                </button>
              </>
            )}

            <button
              onClick={qPop ? closeQuestion : viewAddQ}
              className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
            >
              back
            </button>
          </>
        </>
      )}
    </div>
  );
}

export default EditQuiz;
