import "./TasksPage.scss";
import {TextField} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import LoadingButton from "../LoadingButton/LoadingButton";


export default function TasksPage(props) {
    const [taskName, setTaskName] = useState("");
    const [filter, setFilter] = useState("");


    return <div className="task-page-container">
        <div className="tasks-page-header">
            <form>
                <TextField inputProps={{maxLength: 100}} fullWidth size="small" label="Add Task" autoComplete="off"/>
                <LoadingButton buttonText={<Add/>} buttonProps={{size: "small", variant: "outlined"}}/>
            </form>
            <TextField size="small" label="filter-tasks" autoComplete="off"/>
        </div>
    </div>
}