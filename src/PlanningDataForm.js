import React from "react";
import { useTask, useInput } from "./hooks.js";

var totalLaborCost=0;
var totalWorkingHours=0;
var totalMaterialCost=0;

export default function PlanningDataForm() {
    const { edit, setFormChange } = useTask();
    const { tasks, SaveEditPlan,CancelEdit } = useTask();
    const taskEdit = tasks.filter((task) => task["id"] === edit);
    const [startDate] = useInput(taskEdit[0]["planning data"]["start date"]);
    const [endDate] = useInput(taskEdit[0]["planning data"]["end date"]);
    const [laborsList] = useInput(taskEdit[0]["planning data"]["labors"]);
    const [enquiriesList] = useInput(taskEdit[0]["planning data"]["enquiries"]);
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
            <table className="planned-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Workers</th>
                        <th>Cost Rate</th>
                        <th>Working Hours</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {(laborsList.value).map((labor, index) => {
                        return (
                            <tr key={index}>
                                <td>{labor["title"]}</td>
                                <td>{labor["workers number"]}</td>
                                <td>{labor["cost rate"]}</td>
                                <td>{labor["working hours"]}</td>
                                <td>{labor["cost"]=(labor["workers number"]*labor["cost rate"]*labor["working hours"]||0)}</td>
                            </tr>
                        )
                    })
                    }   
                </tbody>
            </table>
            <label>Total Working Hours: </label>{totalWorkingHours=((laborsList.value).map(labor=>labor["working hours"]).reduce((prev,curr)=>prev+curr,0)||0)}
            <br />
            <label>Total Labor Cost: </label>{totalLaborCost=((laborsList.value).map(labor=>labor["cost"]).reduce((prev,curr)=>prev+curr,0)||0)}
            <br/><br/>
            <table className="planned-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Enquiry Code</th>
                        <th>Status</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {(enquiriesList.value).map((enquiry, index) => {
                        return (
                            <tr key={index}>
                                <td>{enquiry["enquiry category"]}</td>
                                <td>{enquiry["code"]}</td>
                                <td>{enquiry["status"]}</td>
                                <td>{enquiry["cost"]}</td>
                            </tr>
                        )
                    })
                    }   
                </tbody>
            </table>
            <button className="style-button-1">Add</button>
            <br />
            <label>Total Material Hours: </label>{totalMaterialCost=((enquiriesList.value).map(enquiry=>enquiry["cost"]).reduce((prev,curr)=>prev+curr,0)||0)}
            <br /><br />
            <button type="button" className="style-button-1" onClick={() => SaveEditPlan(edit, startDate.value, endDate.value,laborsList.value,totalLaborCost,totalWorkingHours,enquiriesList.value,totalMaterialCost)}>Save</button>
            <button type="button" className="style-button-1" onClick={() => CancelEdit()} style={{position:"relative", left:"2%"}}>Cancel</button>
        </form>
    )
}