import "./TimetablePage.scss";
import Button from "@mui/material/Button";
import {Add, GridView, TableRows} from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import SetTimetableModal from "./SetTimetableModal/SetTimetableModal";
import {useEffect, useState} from "react";
import serverFetch from "../../Fetches";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import TimetableListView from "./TimetableViews/TimetableListView/TimetableListView";
import LoadingContainer from "../LoadingContainer/LoadingContainer";

export default function TimetablePage(props) {
    const [timetable, setTimetable] = useState([]);
    const [subjectNames, setSubjectNames] = useState([]);
    const [view, setView] = useState("grid");
    const [pageLoading, setPageLoading] = useState(true);
    const [subjectData, setSubjectData] = useState({});
    const handleViewChange = (event, newView) => {
        if (newView == undefined) {
            return;
        }
        setView(newView);
    }

    const getTimetable = async () => {
        // Gets the jwt auth token from the local storage
        const token = localStorage.getItem("userAuthToken");

        // Gets the timetable and the subjects from the server
        let response = await serverFetch("/get-timetable", {}, {userAuthToken: token});
        let data = await response.json();
        if (data.valid) {
            // Sets the timetable and the subject names
            setTimetable([data.weekAOrder, data.weekBOrder]);
            setSubjectNames(data.subjects);
            setSubjectData(data.roomNumbers);
        } else {
            console.error("Invalid response from the server");
        }
        setPageLoading(false);
    }

    useEffect(() => {
        (async () => {
            await getTimetable();
        })();
    }, [])

    return <div className="timetable-page-container">
        <div className="timetable-page-header">
            <div className="timetable-create-nav">
                <SetTimetableModal displayTimetable={getTimetable} disabled={pageLoading} subjectNames={subjectNames}/>
            </div>
            {/*<div className="timetable-display-nav">*/}
            {/*    <span>Display:</span>*/}
            {/*    <ToggleButtonGroup exclusive value={view} onChange={handleViewChange}>*/}
            {/*        <ToggleButton value="grid">*/}
            {/*            <Tooltip title="Grid View">*/}
            {/*                <GridView/>*/}
            {/*            </Tooltip>*/}
            {/*        </ToggleButton>*/}
            {/*        <ToggleButton value="list">*/}
            {/*            <Tooltip title={`List View`}>*/}
            {/*                <TableRows/>*/}
            {/*            </Tooltip>*/}
            {/*        </ToggleButton>*/}
            {/*    </ToggleButtonGroup>*/}
            {/*</div>*/}
        </div>
        {pageLoading ? <LoadingContainer/> : <TimetableListView subjectData={subjectData} timetable={timetable}/>}
    </div>
}