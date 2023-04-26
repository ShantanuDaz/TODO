import React from "react";

const Task = ({ tasks = [] }) => {
  return (
    <>
      {tasks.map((el, i) => (
        <article key={i}>
          <h4>{el.title}</h4>
          <p>{el.sd}</p>
          <p>{el.des}</p>
        </article>
      ))}
    </>
  );
};

export default Task;
