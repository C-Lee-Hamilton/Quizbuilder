import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { usePageContext } from "../context/PageContext";
function Search() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [searched, setSearched] = useState(false);

  const { storedQuizzes, setStoredQuizzes } = usePageContext("");

  const fetchTitleResults = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/search-title",
        {
          params: { title },
        }
      );
      setStoredQuizzes(response.data);
      setSearched(true);
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
      setStoredQuizzes(response.data);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center ">
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

        {searched && (
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
        )}
      </>
    </div>
  );
}

export default Search;
