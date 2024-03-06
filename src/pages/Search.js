import React, { useState } from "react";

function Search({ searchPg }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  if (!searchPg) return null;
  return (
    <div className="flex-1 ">
      <input
        type="text"
        placeholder="Search by Title"
        className="w-1/2 text-center mx-auto mb-1"
        onChange={(event) => setTitle(event.target.value) & setTag("")}
        value={title}
      ></input>
      <br />
      <input
        type="text"
        placeholder="Search by Tag"
        className="w-1/2 text-center mx-auto"
        onChange={(event) => setTag(event.target.value) & setTitle("")}
        value={tag}
      ></input>
      <div className="flex flex-col items-start">SearchData</div>
    </div>
  );
}

export default Search;
