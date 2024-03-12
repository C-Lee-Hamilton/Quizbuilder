import { React, useState } from "react";

function TakeQuiz({ take, setTake, selectedQuiz }) {
  const [start, setStart] = useState(false);
  const test = () => {
    console.log(selectedQuiz);
    console.log(selectedQuiz[2][0].Question);
    console.log(selectedQuiz[2][0].A);
    console.log(selectedQuiz[2][0].B);
    console.log(selectedQuiz[2][0].C);
    console.log(selectedQuiz[2][0].D);
  };
  const close = () => {
    setTake(false);
  };
  if (!take) return null;
  return (
    <div className="  overflow-hidden  text-green-500 bg-green-500 border-4 border-white-500  text-white rounded-lg shadow-custom w-11/12 flex-1  mb-2">
      <button
        className="border-8 rounded-lg mx-2 my-2 border-red-500"
        onClick={test}
      >
        tester
      </button>
      <br />

      <button
        className="border-8 rounded-lg mx-2 my-2 border-red-500"
        onClick={close}
      >
        close
      </button>
    </div>
  );
}

export default TakeQuiz;
