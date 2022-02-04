import { React, useState } from "react";
import { useTask, useInput } from "./hooks.js";
import labTitles from "./labor-titles.json";
import enqCategories from "./enquiry-categories.json";
import enquiryStatus from "./enquiry-status.json";

export default function PlanningDataForm() {
    const [hiddenLabButt, setHiddenLabButt] = useState(true);
    const [hiddenEnqButt, setHiddenEnqButt] = useState(true);
    const [hiddenLabSaveEditButt,setHiddenLabSaveEditButt]=useState(-1);
    const [hiddenEnqSaveEditButt,setHiddenEnqSaveEditButt]=useState(-1);
    const { edit, setFormChange } = useTask();
    const { tasks, SaveEditPlan, CancelEdit } = useTask();
    const taskEdit = tasks.filter((task) => task["id"] === edit);
    const [startDate] = useInput(taskEdit[0]["planning data"]["start date"]);
    const [endDate] = useInput(taskEdit[0]["planning data"]["end date"]);
    const [laborsList, setLaborsList] = useState(taskEdit[0]["planning data"]["labors"]);
    const [enquiriesList, setEnquiriesList] = useState(taskEdit[0]["planning data"]["enquiries"]);
    const [laborsTitle, resetLaborsTitle] = useInput("");
    const [laborsWorkersNumber, resetLaborsWorkersNumber] = useInput(0);
    var laborsRate = 0;
    if (laborsTitle.value !== "") laborsRate = (labTitles.filter((title) => title["title"] === laborsTitle.value))[0]["cost rate"];
    const [laborsWorkingHours, resetLaborsWorkingHours] = useInput(0);
    const [enqCat, resetEnqCat] = useInput("");
    const [enqCode, resetEnqCode] = useInput("");
    const [enqStatus, resetEnqStatus] = useInput("");
    const [enqCost, resetEnqCost] = useInput(0);
    var laborsCost = laborsWorkersNumber.value * laborsRate * laborsWorkingHours.value;
    var totalWorkingHours = ((laborsList).map(labor => labor["working hours"] * labor["workers number"]).reduce((prev, curr) => prev + curr, 0) || 0);
    var totalLaborCost = ((laborsList).map(labor => labor["cost"]).reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) || 0);
    var totalMaterialCost = ((enquiriesList).map(enquiry => enquiry["cost"]).reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) || 0);
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
                    {(laborsList).map((labor, index) => {
                        return (
                            <tr key={index} onMouseEnter={()=>setHiddenLabSaveEditButt(index)} onMouseLeave={()=>setHiddenLabSaveEditButt(-1)}>
                                <td>{labor["title"]}</td>
                                <td>{labor["workers number"]}</td>
                                <td>{labor["cost rate"]}</td>
                                <td>{labor["working hours"]}</td>
                                <td>{labor["cost"] = (labor["workers number"] * labor["cost rate"] * labor["working hours"] || 0)}</td>
                                <td style={{ backgroundColor: "White" }} hidden={(index===hiddenLabSaveEditButt)?false:true}><button type="button">Edit</button></td>
                                <td style={{ backgroundColor: "White" }} hidden={(index===hiddenLabSaveEditButt)?false:true}><button type="button">Remove</button></td>
                            </tr>
                        )
                    })
                    }
                    <tr onChange={() => setHiddenLabButt(false)}>
                        <td>
                            <select
                                id="planned-labor-title"
                                placeholder="select a title"
                                value={laborsTitle.value}
                                onChange={laborsTitle.onChange}>
                                <option value="" disabled hidden>Select a Requester</option>
                                {labTitles.map((title, i) => { return (<option key={i} value={title["title"]}>{title["title"]}</option>) })}
                            </select>
                        </td>
                        <td><input
                            id="planned-workers-number"
                            type="text"
                            {...laborsWorkersNumber}>
                        </input>
                        </td>
                        <td>{laborsRate}</td>
                        <td><input
                            id="planned-working-hours"
                            type="text"
                            {...laborsWorkingHours}>
                        </input>
                        </td>
                        <td>{laborsCost}</td>
                        <td style={{ backgroundColor: "White" }}><button type="button" hidden={hiddenLabButt} onClick={() => {
                            setLaborsList([...laborsList, { "title": laborsTitle.value, "workers number": laborsWorkersNumber.value, "cost rate": laborsRate, "working hours": laborsWorkingHours.value, "cost": laborsCost }]);
                            resetLaborsTitle();
                            resetLaborsWorkersNumber();
                            laborsRate = 0;
                            resetLaborsWorkingHours();
                            laborsCost = 0;
                            setHiddenLabButt(true);
                        }
                        }
                        >Save</button></td>
                        <td style={{ backgroundColor: "White" }}><button type="button" hidden={hiddenLabButt} onClick={() => {
                            resetLaborsTitle();
                            resetLaborsWorkersNumber();
                            laborsRate = 0;
                            resetLaborsWorkingHours();
                            laborsCost = 0;
                            setHiddenLabButt(true)
                        }
                        }>Cancel</button></td>
                    </tr>
                </tbody>
            </table>
            <label>Total Working Hours: </label>{totalWorkingHours}
            <br />
            <label>Total Labor Cost: </label>{totalLaborCost}
            <br /><br />
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
                    {(enquiriesList).map((enquiry, index) => {
                        return (
                            <tr key={index} onMouseEnter={()=>setHiddenEnqSaveEditButt(index)} onMouseLeave={()=>setHiddenEnqSaveEditButt(-1)}>
                                <td>{enquiry["enquiry category"]}</td>
                                <td>{enquiry["code"]}</td>
                                <td>{enquiry["status"]}</td>
                                <td>{enquiry["cost"]}</td>
                                <td style={{ backgroundColor: "White" }} hidden={(index===hiddenEnqSaveEditButt)?false:true}><button type="button">Edit</button></td>
                                <td style={{ backgroundColor: "White" }} hidden={(index===hiddenEnqSaveEditButt)?false:true}><button type="button">Remove</button></td>
                            </tr>
                        )
                    })
                    }
                    <tr onChange={() => setHiddenEnqButt(false)}>
                        <td><select
                                id="planned-enquiry-categories"
                                placeholder="select a category"
                                value={enqCat.value}
                                onChange={enqCat.onChange}>
                                <option value="" disabled hidden>Select a Category</option>
                                {enqCategories.map((cat, i) => { return (<option key={i} value={cat}>{cat}</option>) })}
                            </select>
                        </td>
                        <td><input
                            type="text"
                            {...enqCode}>
                        </input>
                        </td>
                        <td><select
                                id="planned-enquiry-status"
                                placeholder="select a status"
                                value={enqStatus.value}
                                onChange={enqStatus.onChange}>
                                <option value="" disabled hidden>Select a Status</option>
                                {enquiryStatus.map((stat, i) => { return (<option key={i} value={stat}>{stat}</option>) })}
                            </select>
                        </td>
                        <td><input
                            type="text"
                            {...enqCost}>
                        </input>
                        </td>
                        <td style={{ backgroundColor: "White" }}><button type="button" hidden={hiddenEnqButt} onClick={() => {
                            setEnquiriesList([...enquiriesList, { "enquiry category": enqCat.value, "code": enqCode.value, "status": enqStatus.value, "cost": enqCost.value }]);
                            resetEnqCat();
                            resetEnqCode();
                            resetEnqStatus();
                            resetEnqCost();
                            setHiddenEnqButt(true);
                        }
                        }
                        >Save</button></td>
                        <td style={{ backgroundColor: "White" }}><button type="button" hidden={hiddenEnqButt} onClick={() => {
                            resetEnqCat();
                            resetEnqCode();
                            resetEnqStatus();
                            resetEnqCost();
                            setHiddenEnqButt(true)
                        }
                        }>Cancel</button></td>
                    </tr>
                </tbody>
            </table>
            <label>Total Material Cost: </label>{totalMaterialCost}
            <br /><br />
            <button type="button" className="style-button-1" onClick={() => SaveEditPlan(edit, startDate.value, endDate.value, laborsList, totalLaborCost, totalWorkingHours, enquiriesList, totalMaterialCost)}>Save</button>
            <button type="button" className="style-button-1" onClick={() => CancelEdit()} style={{ position: "relative", left: "2%" }}>Cancel</button>
        </form>
    )
}