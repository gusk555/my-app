import {React,useState} from "react";
import { useTask } from "./hooks.js";

export default function Task({ id, type, description, requester, location, priority, reqDate }) {
    const { edit, RemoveTask, EditTask } = useTask();
    const [hiddenTaskSaveEditButt,setHiddenTaskSaveEditButt]=useState(-1);
    const toggleDisabled=(edit===-1)?false:true;
        return (
            <tr key={id} onMouseEnter={()=>setHiddenTaskSaveEditButt(id)} onMouseLeave={()=>setHiddenTaskSaveEditButt(-1)}>
                <td>{id}</td>
                <td>{type}</td>
                <td>{description}</td>
                <td>{requester}</td>
                <td>{location}</td>
                <td>{priority}</td>
                <td>{reqDate}</td>
                <td style={{backgroundColor:"White", width:"20px"}}>
                    <button className="style-button-1" value="Edit" onClick={() => EditTask(id)} disabled={toggleDisabled} hidden={(id===hiddenTaskSaveEditButt)?false:true}>Update</button>
                </td>
                <td style={{backgroundColor:"White", width:"20px"}} >
                    <button className="style-button-1" value="Delete" onClick={() => RemoveTask(id) } disabled={toggleDisabled} hidden={(id===hiddenTaskSaveEditButt)?false:true}>Delete</button>
                </td>
            </tr>
        )
}
