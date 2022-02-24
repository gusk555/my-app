import React from "react";
import { useInput, useTask } from "./hooks.js";
import depData from "./departments-data.json";

export default function TaskForm() {
    const id = Math.floor(Math.random() * 1000000);
    const [type, resetType] = useInput("Additional Task");
    const [description, resetDescription] = useInput("");
    const [requester, resetRequester] = useInput("");
    const [location, resetLocation] = useInput("");
    const [priority, resetPriority] = useInput("Low");
    const [reqDate, resetReqDate] = useInput("");
    const { AddTask } = useTask();
    const submit = e => {
        e.preventDefault();
        AddTask(id, type.value, description.value, requester.value, location.value, priority.value,reqDate.value);
        fetch("src\task-data.json",{
            method:"POST",
            body:JSON.stringify({description})
        })
        resetType();
        resetDescription();
        resetRequester();
        resetLocation();
        resetPriority();
        resetReqDate();
    }
    return (
        <form onSubmit={submit}>
            <>
                Type:
                <input
                    {...type}
                    id="Additional Task"
                    checked={type.value === "Additional Task"}
                    value="Additional Task"
                    onChange={type.onChange}
                    type="radio"
                    required>
                </input>
                <label htmlFor="Additional Task">Additional Task</label>
                <input
                    {...type}
                    id="Unsafe Condition"
                    checked={type.value === "Unsafe Condition"}
                    value="Unsafe Condition"
                    onChange={type.onChange}
                    type="radio"
                    required>
                </input>
                <label htmlFor="Unsafe Condition">Unsafe Condition</label>
                <br /><br />
                <label htmlFor="description">Description: </label>
                <input
                    id="description"
                    {...description}
                    type="text"
                    placeholder="enter task description..."
                    required>
                </input>
                <br /><br />
                <label htmlFor="requester">Requester: </label>
                <select
                    id="requester"
                    placeholder="select a department"
                    {...requester}
                    value={requester.value}
                    onChange={requester.onChange}
                    required>
                        <option value="" disabled hidden>Select a Requester</option>
                    {depData.map((dep, i) => { return (<option key={i} value={dep.department}>{dep.department}</option>) })}
                </select>
                <br /><br />
                <label htmlFor="location">Location: </label>
                <input
                    id="location"
                    {...location}
                    type="text"
                    placeholder="enter task location..."
                    required>
                </input>
                <br /><br />
                <label htmlFor="priority">Priority: </label>
                <select
                    id="priority"
                    value={priority.value}
                    onChange={priority.onChange}
                    required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <br /><br />
                <label htmlFor="request date">Request Date: </label>
                <input
                    id="request date"
                    {...reqDate}
                    type="date"
                    required>
                </input>
                <br /><br />
                <button type="submit" className="style-button-1">Add</button>
            </>
        </form>
    );
}