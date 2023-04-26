import React from "react";
import "./Actions.css";
const Actions = ({ getTasks = () => {} }) => {
  const formSubmitted = (e) => {
    e.preventDefault();
    let data = {
      title: e.target[0].value,
      sd: e.target[1].value,
      des: e.target[2].value,
    };
    document.getElementById("reset").click();
    getTasks(data);
  };
  return (
    <section id="actions">
      <form onSubmit={(e) => formSubmitted(e)}>
        <h3>Add ToDo</h3>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="sd">Short Description</label>
          <input type="text" name="sd" id="sd" />
        </div>
        <div>
          <label htmlFor="des">Description</label>
          <textarea name="des" id="des" cols="30" rows="10"></textarea>
        </div>
        <button type="submit">Save</button>
        <button type="reset" id="reset">
          Clear
        </button>
      </form>
    </section>
  );
};

export default Actions;
