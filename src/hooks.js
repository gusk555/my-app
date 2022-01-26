import React, { createContext, useContext, useState } from "react";
import taskData from "./task-data.json";

const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [{ value, onChange: event => setValue(event.target.value) }, () => setValue(initialValue)];
};

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(taskData);
  const [edit, setEdit] = useState(-1);
  const [formChange,setFormChange]=useState(0);
  const RemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const AddTask = (id, type, description, requester, location, priority, reqDate) => {
    setTasks([...tasks, {
      "id": id,
      "type": type,
      "description": description,
      "location": location,
      "requester": requester,
      "request date": reqDate,
      "priority": priority,
      "job category": "",
      "status": "",
      "planning data": {
        "start date": "",
        "end date": "",
        "labors": [
          {
            "title": "",
            "workers number": 0,
            "cost rate": 0,
            "working hours": 0,
            "cost": 0
          }
        ],
        "total working hours": 0,
        "labor cost": 0,
        "enquiries": [
          {
            "enquiry category": "0",
            "code": 0,
            "status": "",
            "cost": 0
          }
        ],
        "material cost": 0
      },
      "actual data": {
        "start date": "",
        "end date": "",
        "progress rate": 0,
        "labors": [
          {
            "Name": "",
            "title": "",
            "cost rate": 0,
            "working hours": 0
          }
        ],
        "total working hours": 0,
        "labor cost": 0,
        "material cost": 0
      }
    }]);
  };
  const EditTask = (id) => {
    setEdit(id);
  }
  const SaveEdit = (id, type, description, requester, location, priority, reqDate) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return {...task,
          "id": id,
          "type": type,
          "description": description,
          "location": location,
          "requester": requester,
          "request date": reqDate,
          "priority": priority
        };
      }
      else return task;
    }
    ))
    setEdit(-1);
    setFormChange(0);
  }
  const SaveEditPlan=(id,startDate,endDate,laborsList,totalLaborCost,totalWorkingHours,enquiriesList,totalMaterialCost)=>{
    setTasks(tasks.map((task) => {
      if (task["id"] === id) {
        return {...task,"planning data":{
          "start date":startDate,
          "end date":endDate,
          "labors":laborsList,
          "labor cost":totalLaborCost,
          "total working hours":totalWorkingHours,
          "enquiries":enquiriesList,
          "material cost":totalMaterialCost
        } 
        }
        ;
      }
      else return task;
    }
    ))
    setEdit(-1);
    setFormChange(0);
  }
  const CancelEdit = () => {
    setEdit(-1);
    setFormChange(0);
  }
  return (
    <TaskContext.Provider value={{ tasks, edit, RemoveTask, AddTask, EditTask, SaveEdit, CancelEdit,SaveEditPlan,formChange,setFormChange }}>
      {children}
    </TaskContext.Provider>
  );
}
