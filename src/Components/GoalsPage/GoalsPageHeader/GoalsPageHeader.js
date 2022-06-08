import AddGoalsModal from "./AddGoalsModal/AddGoalsModal";
import {TextField} from "@mui/material";
import "./GoalsPageHeader.scss";

export default function GoalsPageHeader(props){
    return <div className="goals-page-header-container">
        <AddGoalsModal/>
        <TextField autoComplete="off" variant="outlined" size="small" label="Filter Goals"/>
    </div>
}