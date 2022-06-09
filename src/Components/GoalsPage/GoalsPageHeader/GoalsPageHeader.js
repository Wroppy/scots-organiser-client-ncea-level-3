import AddGoalsModal from "./AddGoalsModal/AddGoalsModal";
import {TextField} from "@mui/material";
import "./GoalsPageHeader.scss";


export default function GoalsPageHeader(props) {
    let [filter, setFilter] = props.filterState;
    return <div className="goals-page-header-container">
        <AddGoalsModal/>
        <TextField value={filter} onChange={(e) => {
            setFilter(e.currentTarget.value)
        }} autoComplete="off" variant="outlined" size="small" label="Filter Goals"/>
    </div>
}