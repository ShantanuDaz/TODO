import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import "./Board.css";
const Board = ({ tasks = {} }) => {
  const [days, setDays] = useState([]);
  useEffect(() => {
    getPastDatesFormatted(new Date(), 5);
  }, []);
  const getPastDatesFormatted = (date, numDays) => {
    const pastDates = [];
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
    for (let i = 0; i < numDays; i++) {
      const pastDate = new Date(date);
      pastDate.setDate(date.getDate() - i);
      const formattedDate = dateFormatter.format(pastDate);
      pastDates.push(formattedDate);
    }
    setDays(pastDates.reverse());
  };

  return (
    <section id="board">
      {days.map((day) => (
        <div key={day}>
          <h4>{day}</h4>
          <Task tasks={tasks?.[day] || []} />
        </div>
      ))}
    </section>
  );
};

export default Board;
