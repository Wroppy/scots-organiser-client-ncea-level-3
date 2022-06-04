import "./TimetablePage.scss";
import Button from "@mui/material/Button";
import {Add, GridView, TableRows} from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import SetTimetableModal from "./SetTimetableModal/SetTimetableModal";
import {useEffect, useState} from "react";
import serverFetch from "../../Fetches";

export default function TimetablePage(props) {
    const [timetable, setTimetable] = useState([]);
    const [subjectNames, getSubjectNames] = useState([]);

    useEffect(() => {
        (async () => {
            // Gets the jwt auth token from the local storage
            const token = localStorage.getItem("userAuthToken");

            // Gets the timetable and the subjects from the server
            let response = await serverFetch("/get-timetable", {}, {userAuthToken: token});
            let data = await response.json();
            console.log(data);

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
                <Tooltip title="Grid View">
                    <Button variant="outlined">
                        <GridView/>
                    </Button>
                </Tooltip>
                <Tooltip title="List View">
                    <Button variant="outlined">
                        <TableRows/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    </div>
}