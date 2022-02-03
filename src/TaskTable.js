import React from "react";
import TaskList from "./TaskList.js";
import "./App.css";

export default function TaskTable() {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Task Type</th>
          <th>Task Description</th>
          <th>Requester</th>
          <th>Location</th>
          <th>Priority</th>
          <th>Request Date</th>
        </tr>
      </thead>
      <tbody>
        <TaskList />
      </tbody>
    </table>
  );
}
