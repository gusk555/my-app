import React from "react";
import { useTask } from "./hooks.js";
import Task from "./Task.js";

export default function TaskList() {
  const {tasks}=useTask();
  return (
    tasks.map((tk) => <Task key={tk.id} {...tk} />)
  );
}
