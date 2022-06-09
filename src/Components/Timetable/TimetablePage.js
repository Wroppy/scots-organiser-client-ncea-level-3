import "./TimetablePage.scss";
import Button from "@mui/material/Button";
import {Add, GridView, TableRows} from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import SetTimetableModal from "./SetTimetableModal/SetTimetableModal";
import {useEffect, useState} from "react";
import serverFetch from "../../Fetches";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

export default function TimetablePage(props) {
    const [timetable, setTimetable] = useState([]);
    const [subjectNames, getSubjectNames] = useState([]);
    const [view, setView] = useState("grid");

    const handleViewChange = (event, newView) => {
        if (newView == undefined) {
            return;
        }
        setView(newView);
    }

    useEffect(() => {
        (async () => {
            // Gets the jwt auth token from the local storage
            const token = localStorage.getItem("userAuthToken");

            // Gets the timetable and the subjects from the server
            let response = await serverFetch("/get-timetable", {}, {userAuthToken: token});
            let data = await response.json();
            if (data.valid) {
                // Sets the timetable and the subject names
                setTimetable(data.timetable);
                getSubjectNames(data.subjects);
            } else {
                console.error("Invalid response from the server");
            }
        })();
    }, [])

    const [pageLoading, setPageLoading] = useState(false);

    return <div className="timetable-page-container">
        <div className="timetable-page-header">
            <div className="timetable-create-nav">
                <SetTimetableModal disabled={pageLoading} subjectNames={subjectNames}/>
            </div>
            <div className="timetable-display-nav">
                <span>Display:</span>
                <ToggleButtonGroup exclusive value={view} onChange={handleViewChange}>
                    <ToggleButton value="grid">
                        <Tooltip title="Grid View">
                            <GridView/>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="list">
                        <Tooltip title={`List View`}>
                            <TableRows/>
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    </div>
}