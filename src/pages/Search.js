import React, { useState } from "react";
import axios from "axios";
import TakeQuiz from "../components/TakeQuiz";
function Search({ searchPg }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [searchQuizzes, setSearchQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [viewAmt, setViewAmt] = useState();
  const [takeSearch, setTakeSearch] = useState(false);
  const takeQuizButton = (e) => {
    setSelectedQuiz([
      searchQuizzes[e].title,
      searchQuizzes[e].author,
      searchQuizzes[e].quiz,
      searchQuizzes[e]._id,
      searchQuizzes[e].views,
    ]);
    setViewAmt(searchQuizzes[e].views);
    setTakeSearch(!takeSearch);
  };
  const fetchTitleResults = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/search-title",
        {
          params: { title },
        }
      );
      setSearchQuizzes(response.data);
      console.log(response.data);
      console.log(title);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  const fetchAuthorResults = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/search-author",
        {
          params: { author },
        }
      );
      setSearchQuizzes(response.data);
      console.log(response.data);
      console.log(author);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  if (!searchPg) return null;
  return (
    <div className="flex-1 flex flex-col items-center ">
      {!takeSearch && (
        <>
          <input
            type="text"
            placeholder="Search by Title"
            className="rounded-lg w-1/2 mt-2 text-lg text-green-500 text-center mx-auto mb-1"
            onChange={(e) => setTitle(e.target.value) & setAuthor("")}
            value={title}
          ></input>
          <button
            onClick={fetchTitleResults}
            className="rounded-lg bg-green-500 border-2 w-1/4 text-white border-white-500 text-lg text-center mx-auto mb-1"
          >
            Search
          </button>
          <input
            type="text"
            placeholder="Search by Author"
            className="rounded-lg w-1/2 text-green-500 text-lg text-center mx-auto mb-2"
            onChange={(e) => setAuthor(e.target.value) & setTitle("")}
            value={author}
          ></input>
          <button
            onClick={fetchAuthorResults}
            className="rounded-lg bg-green-500 border-2 w-1/4 text-white border-white-500 text-lg text-center mx-auto mb-1"
          >
            Search
          </button>

          <div className="w-full ">
            {searchQuizzes.map((quiz, index) => (
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
        </>
      )}
      <TakeQuiz
        take={takeSearch}
        setTake={setTakeSearch}
        Mode="Search"
        selectedQuiz={selectedQuiz}
        viewAmt={viewAmt}
        setViewAmt={setViewAmt}
      />
    </div>
  );
}

export default Search;
