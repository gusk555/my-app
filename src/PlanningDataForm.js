import React from "react";
import { useTask, useInput } from "./hooks.js";

export default function PlanningDataForm() {
    const { edit, setFormChange } = useTask();
    const { tasks, SaveEditPlan,CancelEdit } = useTask();
    const taskEdit = tasks.filter((task) => task.id === edit);
    const [startDate] = useInput(taskEdit[0]["planning data"]["start date"]);
    const [endDate] = useInput(taskEdit[0]["planning data"]["end date"]);
    const laborsList = taskEdit[0]["planning data"]["labors"];
    return (
        <form onChange={() => { setFormChange(2) }}>
            <label htmlFor="planned start date">Start Date: </label>
            <input
                id="planned start date"
                {...startDate}
                type="date">
            </input>
            <br /><br />
            <label htmlFor="planned end date">End Date: </label>
            <input
                id="planned end date"
                {...endDate}
                type="date">
            </input>
            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Workers</th>
                        <th>Cost Rate</th>
                        <th>Working Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {laborsList.map((labor, index) => {
                        return (
                            <tr key={index}>
                                <td>{labor["title"]}</td>
                                <td>{labor["workers number"]}</td>
                                <td>{labor["cost rate"]}</td>
                                <td>{labor["working hours"]}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <br /><br />
            <button className="style-button-1" onClick={() => { SaveEditPlan(edit, startDate.value, endDate.value,laborsList) }}>Save</button>
            <button className="style-button-1" onClick={() => CancelEdit()} style={{position:"relative", left:"2%"}}>Cancel</button>
        </form>
    )
}