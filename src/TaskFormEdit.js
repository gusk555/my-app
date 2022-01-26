import React from "react";
import { useTask, useInput } from "./hooks.js";
import depData from "./departments-data.json";

export default function TaskFormEdit() {
    const { edit,setFormChange } = useTask();
    const { tasks, SaveEdit, CancelEdit } = useTask();
    const taskEdit = tasks.filter((task) =>
        task.id === edit);
    const [type] = useInput(taskEdit[0].type);
    const [description] = useInput(taskEdit[0].description);
    const [requester] = useInput(taskEdit[0].requester);
    const [location] = useInput(taskEdit[0].location);
    const [priority] = useInput(taskEdit[0].priority);
    const [reqDate] = useInput(taskEdit[0].reqDate);
    return (
        <form onChange={()=>{setFormChange(1)}}>
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
            <button className="style-button-1" onClick={() => { SaveEdit(edit, type.value, description.value, requester.value, location.value, priority.value, reqDate.value) }}>Save</button>
            <button className="style-button-1" onClick={() => CancelEdit()} style={{position:"relative", left:"2%"}}>Cancel</button>
        </form>
    )
}