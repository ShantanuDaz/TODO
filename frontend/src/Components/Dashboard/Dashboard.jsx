import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import Actions from "../Actions/Actions";

const Dashboard = () => {
  const [tasks, setTasks] = useState({});
  useEffect(() => {
    getTasksFormDb();
  }, []);
  const getTasksFormDb = async () => {
    const res = await fetch("http://localhost:5000/getTasks");
    const data = await res.json();
    setTasks(data);
  };
  const saveTask = async (data, day) => {
    let reqData = {
      title: data.title,
      sdesc: data.sd,
      desc: data.des,
    };
    await fetch("http://localhost:5000/addTask", {
      body: JSON.stringify(reqData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getTasksFormDb();
  };
  return (
    <>
      <Board tasks={tasks} />
      <Actions getTasks={(data) => saveTask(data)} />
    </>
  );
};

export default Dashboard;
