import TaskTable from "./TaskTable.js";
import TaskForm from "./TaskForm.js";
import { React } from "react";
import "./App.css";
import { useTask } from "./hooks.js";
import TaskFormEdit from "./TaskFormEdit.js";
import TaskTab from "./TaskTab"
import PlanningDataForm from "./PlanningDataForm.js";

export default function App() {
  const { edit } = useTask();
  if (edit === -1)
    return (
      <div className="App">
        <TaskTab>
          <TaskForm />
        </TaskTab>
        <TaskTable />
      </div>
    );
  else
    return (
      <div className="App">
        <TaskTab>
          <TaskFormEdit />
          <PlanningDataForm/>
        </TaskTab>
        <TaskTable />
      </div>
    );
}
