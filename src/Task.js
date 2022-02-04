import {React,useState} from "react";
import { useTask } from "./hooks.js";

export default function Task({ id, type, description, requester, location, priority, reqDate }) {
    const { edit, RemoveTask, EditTask } = useTask();
    const [hiddenTaskEditRemoveButt,setHiddenTaskEditRemoveButt]=useState("");
    const toggleHidden=(edit===-1)?false:true;
        return (
            <tr key={id} onMouseEnter={()=>setHiddenTaskEditRemoveButt(id)} onMouseLeave={()=>setHiddenTaskEditRemoveButt("")}>
                <td>{id}</td>
                <td>{type}</td>
                <td style={{width:"20%"}}>{description}</td>
                <td>{requester}</td>
                <td>{location}</td>
                <td>{priority}</td>
                <td>{reqDate}</td>
                <td style={{backgroundColor:"White",width:"5%"}}>
                    <button className="style-button-1" value="Edit" onClick={() => EditTask(id)} hidden={(id===hiddenTaskEditRemoveButt && toggleHidden===false)?false:true}>Update</button>
                </td>
                <td style={{backgroundColor:"White",width:"5%"}} >
                    <button className="style-button-1" value="Delete" onClick={() => RemoveTask(id) } hidden={(id===hiddenTaskEditRemoveButt && toggleHidden===false)?false:true}>Delete</button>
                </td>
            </tr>
        )
}
