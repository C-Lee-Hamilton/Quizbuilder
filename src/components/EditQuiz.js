import { React, useState } from "react";

function EditQuiz({ editor, setEditor, selectedQuiz }) {
  const [isTitleSet, setIsTitleSet] = useState(false);
  const [title, setTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [qInput, setQInput] = useState("");
  const [a1Input, setA1Input] = useState("");
  const [a2Input, setA2Input] = useState("");
  const [a3Input, setA3Input] = useState("");
  const [a4Input, setA4Input] = useState("");
  const [answer, setAnswer] = useState("");
  //   const titleClick = () => {
  //     title === "" ? setIsTitleSet(false) : setIsTitleSet(true);
  //     if (title === "") {
  //       setIsTitleSet(false);
  //       setErrMsg("Error: Create Title");
  //     } else {
  //       setIsTitleSet(true);
  //       setErrMsg("");
  //     }
  //   };

  if (!editor) return null;
  return (
    <div className="  overflow-hidden  text-green-500 bg-green-500 border-4 border-white-500  text-white rounded-lg shadow-custom w-11/12 flex-1 mt-2 mb-2">
      {/* {errMsg}
      {!isTitleSet && (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="enter quiz name"
            className="mx-auto w-3/4 text-center text-green-500 text-lg rounded-lg my-2 shadow-custom"
          />

          <button className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom">
            Save and Continue
          </button>
        </>
      )} */}

      {/* {isTitleSet && ( */}
      <>
        <input
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          type="text"
          placeholder="Enter Question"
          className="mx-auto w-11/12 text-center text-green-500  my-2"
        />
        <input
          value={a1Input}
          onChange={(e) => setA1Input(e.target.value)}
          type="text"
          placeholder="answer"
          className="mx-auto w-3/4 my-1 text-green-500 text-center"
        />
        <input
          value={a2Input}
          onChange={(e) => setA2Input(e.target.value)}
          placeholder="answer"
          type="text"
          className="mx-auto w-3/4 my-1 text-green-500 text-center"
        />
        <input
          value={a3Input}
          onChange={(e) => setA3Input(e.target.value)}
          placeholder="answer"
          type="text"
          className="mx-auto w-3/4 my-1 text-green-500 text-center"
        />
        <input
          value={a4Input}
          onChange={(e) => setA4Input(e.target.value)}
          placeholder="answer"
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
          <>
            <button className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom">
              Next
            </button>
            <button className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom">
              Save
            </button>
          </>
        </div>
      </>
      {/* )} */}
      <br />
      <button className=" border-2 sm:w-3/4 md:w-1/2 lg:w-1/4 text-2xl bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom">
        Close
      </button>
    </div>
  );
}

export default EditQuiz;
