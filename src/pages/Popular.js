import React from "react";

function Popular({ pop }) {
  if (!pop) return null;
  return (
    <div className=" flex-1 flex flex-col items-start">
      <h1>data1</h1>
      <h1>data2</h1>
    </div>
  );
}

export default Popular;
